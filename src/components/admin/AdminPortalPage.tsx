import React, { useState, useEffect } from 'react';
import { getCurrentUser, logoutUser } from '../../services/authService';
import type { User } from '../../services/authService';
import '../../styles/admin-editorial.css';
import { 
  fetchJiraIssues, 
  createJiraIssue, 
  updateJiraIssue, 
  updateIssueStatus, 
  deleteJiraIssue, 
  subscribeToJiraChanges 
} from '../../services/jiraService';
import type { JiraIssue, JiraStatus, JiraIssueType } from '../../services/jiraService';
import { 
  fetchCompanies, 
  fetchCompanyDetail, 
  createCompany, 
  updateCompany, 
  deleteCompany, 
  addCompanyActivity, 
  addCompanyComment,
  deleteCompanyComment,
  subscribeToCrmChanges 
} from '../../services/crmService';
import type { CrmCompany, CrmActivity } from '../../services/crmService';
import {
  fetchLeadsFromDb,
  updateLeadStatus,
  assignLeadRole,
  addLeadNote,
  deleteLead,
  subscribeToLeadChanges,
} from '../../services/leadService';
import type { Lead, LeadStatus, LeadRole } from '../../services/leadService';
import { AdminLoginPage } from './AdminLoginPage';
import { JiraBoard } from './JiraBoard';
import { JiraBacklog } from './JiraBacklog';
import { CrmDirectory } from './CrmDirectory';
import { CrmCompanyDrawer } from './CrmCompanyDrawer';
import { JiraIssueModal } from './JiraIssueModal';
import { WebInquiriesView } from './WebInquiriesView';
import { 
  LayoutGrid, 
  Inbox, 
  Building, 
  LogOut, 
  ArrowLeft,
  MessageSquareText,
  UserCheck
} from 'lucide-react';

interface AdminPortalPageProps {
  onReturnToSite: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onReturnToSite, darkMode = false }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [activeTab, setActiveTab] = useState<'board' | 'backlog' | 'directory' | 'inquiries'>('board');
  
  // Data States
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [companies, setCompanies] = useState<CrmCompany[]>([]);
  const [inquiries, setInquiries] = useState<Lead[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CrmCompany | null>(null);
  const [territoryFilter, setTerritoryFilter] = useState<'all' | 'espana' | 'bariloche'>(() => {
    const user = getCurrentUser();
    if (user?.projectId === 'espana') return 'espana';
    if (user?.projectId === 'bariloche') return 'bariloche';
    return 'all';
  });

  // Modal States
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<JiraIssue | null>(null);
  const [defaultCompanyForIssue, setDefaultCompanyForIssue] = useState<string | null>(null);

  // Initial Data Load
  const refreshAllData = async () => {
    const [fetchedIssues, fetchedCompanies, fetchedLeads] = await Promise.all([
      fetchJiraIssues(),
      fetchCompanies(),
      fetchLeadsFromDb(),
    ]);
    setIssues(fetchedIssues);
    setCompanies(fetchedCompanies);
    setInquiries(fetchedLeads);

    if (selectedCompany) {
      const refreshedDetail = await fetchCompanyDetail(selectedCompany.id);
      if (refreshedDetail) {
        setSelectedCompany(refreshedDetail);
      }
    }
  };

  useEffect(() => {
    refreshAllData();

    const unsubJira = subscribeToJiraChanges(() => refreshAllData());
    const unsubCrm = subscribeToCrmChanges(() => refreshAllData());
    const unsubLeads = subscribeToLeadChanges(() => refreshAllData());

    return () => {
      unsubJira();
      unsubCrm();
      unsubLeads();
    };
  }, []);

  if (!currentUser) {
    return (
      <AdminLoginPage
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          refreshAllData();
        }}
        onReturnToSite={onReturnToSite}
      />
    );
  }

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // Jira Handlers
  const handleStatusChange = async (id: string, newStatus: JiraStatus) => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    await updateIssueStatus(id, newStatus);
    await refreshAllData();
  };

  const handleSaveIssue = async (issueData: any) => {
    if (editingIssue) {
      await updateJiraIssue(editingIssue.id, issueData);
    } else {
      await createJiraIssue(issueData);
    }
    await refreshAllData();
  };

  const handleDeleteIssue = async (id: string) => {
    if (window.confirm('¿Deseas eliminar esta incidencia de Jira?')) {
      await deleteJiraIssue(id);
      await refreshAllData();
    }
  };

  const handleQuickCreateBacklog = async (title: string, type: JiraIssueType) => {
    await createJiraIssue({
      title,
      description: '',
      type,
      status: 'backlog',
      priority: 'medium',
      companyId: null,
      assignedTo: currentUser.name,
      storyPoints: 3,
      value: 0
    });
    await refreshAllData();
  };

  const handleOpenCompanyDrawer = async (companyId: string) => {
    const detail = await fetchCompanyDetail(companyId);
    if (detail) {
      setSelectedCompany(detail);
    }
  };

  const handleCreateIssueForCompany = (companyId: string) => {
    setEditingIssue(null);
    setDefaultCompanyForIssue(companyId);
    setIsIssueModalOpen(true);
  };

  // CRM Handlers
  const handleCreateCompany = async (companyData: any) => {
    await createCompany(companyData);
    await refreshAllData();
  };

  const handleUpdateCompany = async (id: string, updates: Partial<CrmCompany>) => {
    await updateCompany(id, updates);
    const updatedDetail = await fetchCompanyDetail(id);
    if (updatedDetail) {
      setSelectedCompany(updatedDetail);
    }
    await refreshAllData();
  };

  const handleDeleteCompany = async (id: string) => {
    if (window.confirm('¿Deseas eliminar esta cuenta del directorio CRM?')) {
      await deleteCompany(id);
      if (selectedCompany?.id === id) {
        setSelectedCompany(null);
      }
      await refreshAllData();
    }
  };

  const handleAddActivity = async (companyId: string, activityData: Omit<CrmActivity, 'id' | 'companyId' | 'createdAt'>) => {
    await addCompanyActivity(companyId, activityData);
    const updatedDetail = await fetchCompanyDetail(companyId);
    if (updatedDetail) {
      setSelectedCompany(updatedDetail);
    }
    await refreshAllData();
  };

  const handleAddComment = async (companyId: string, commentText: string) => {
    if (!currentUser) return;
    await addCompanyComment(companyId, {
      comment: commentText,
      authorName: currentUser.name,
      authorId: currentUser.id
    });
    const updatedDetail = await fetchCompanyDetail(companyId);
    if (updatedDetail) {
      setSelectedCompany(updatedDetail);
    }
    await refreshAllData();
  };

  const handleDeleteComment = async (commentId: string, companyId: string) => {
    await deleteCompanyComment(commentId);
    const updatedDetail = await fetchCompanyDetail(companyId);
    if (updatedDetail) {
      setSelectedCompany(updatedDetail);
    }
    await refreshAllData();
  };

  // Inbound Web Inquiries Handlers
  const handleInquiryStatusChange = async (id: string, status: LeadStatus) => {
    setInquiries(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    await updateLeadStatus(id, status);
    await refreshAllData();
  };

  const handleInquiryAssignChange = async (id: string, assignedTo: LeadRole) => {
    setInquiries(prev => prev.map(l => l.id === id ? { ...l, assignedTo } : l));
    await assignLeadRole(id, assignedTo);
    await refreshAllData();
  };

  const handleInquiryAddNote = async (id: string, text: string) => {
    await addLeadNote(id, text, currentUser.name);
    await refreshAllData();
  };

  const handleInquiryDelete = async (id: string) => {
    await deleteLead(id);
    await refreshAllData();
  };

  const newInquiriesCount = inquiries.filter(i => i.status === 'nuevo').length;
  const isAdmin = currentUser.role === 'admin';

  const scopedCompanies = companies.filter(c => {
    if (!isAdmin) {
      if (currentUser.projectId === 'espana') return c.territory === 'espana' || c.id.startsWith('vlc-');
      if (currentUser.projectId === 'bariloche') return c.territory === 'bariloche';
    }
    if (territoryFilter === 'all') return true;
    if (c.territory && c.territory === territoryFilter) return true;
    if (c.id.startsWith('vlc-') && territoryFilter === 'espana') return true;
    return false;
  });

  const scopedIssues = issues.filter(i => {
    if (!isAdmin) {
      if (currentUser.projectId === 'espana') return i.territory === 'espana' || (i.companyId && i.companyId.startsWith('vlc-'));
      if (currentUser.projectId === 'bariloche') return i.territory === 'bariloche';
    }
    if (territoryFilter === 'all') return true;
    if (i.territory && i.territory === territoryFilter) return true;
    if (i.companyId && i.companyId.startsWith('vlc-') && territoryFilter === 'espana') return true;
    return false;
  });

  const activeIssuesCount = scopedIssues.filter(i => i.status !== 'backlog').length;
  const backlogIssuesCount = scopedIssues.filter(i => i.status === 'backlog').length;

  return (
    <div className="admin-editorial min-h-screen flex flex-col">
      
      {/* TOP NEO-BRUTALIST HEADER BAR */}
      <header
        className="px-4 sm:px-6 py-3 flex flex-col lg:flex-row items-center justify-between gap-3 sticky top-0 z-40"
        style={{
          backgroundColor: '#171715',
          borderBottom: '3px solid #171715',
          boxShadow: '0 4px 0 #171715'
        }}
      >
        {/* Left: Brand & Return */}
        <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-start">
          <button
            onClick={onReturnToSite}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black transition-all cursor-pointer"
            style={{
              backgroundColor: '#ffffff',
              color: '#171715',
              border: '2px solid #171715',
              boxShadow: '2px 2px 0 #ffe526'
            }}
            title="Volver a la Web Pública"
          >
            <ArrowLeft size={13} />
            <span>Web Principal</span>
          </button>

          <div className="flex items-center space-x-2.5">
            <img
              src="/landing-assets/iatomica-logo-original.png"
              alt="Logo"
              width={34}
              height={30}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "Impact, 'Arial Narrow', sans-serif",
                    fontSize: '18px',
                    letterSpacing: '-0.5px',
                    textTransform: 'uppercase',
                    color: '#ffffff'
                  }}
                >
                  iAtomica
                </span>
                <span
                  style={{
                    backgroundColor: '#ffe526',
                    color: '#171715',
                    fontSize: '9px',
                    fontWeight: 900,
                    padding: '1px 6px',
                    borderRadius: '2px',
                    letterSpacing: '0.5px'
                  }}
                >
                  OPERACIONES &amp; CRM
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">
                SQLite Live Sync · Multi-territorio
              </span>
            </div>
          </div>
        </div>

        {/* Center: Module Switcher (Brutalist Tabs) */}
        <div className="flex items-center gap-1.5 p-1 rounded-sm bg-neutral-900 border border-neutral-700 flex-wrap justify-center">
          
          {/* Tablero Activo */}
          <button
            onClick={() => setActiveTab('board')}
            className={`admin-tab-btn cursor-pointer ${activeTab === 'board' ? 'active' : 'inactive'}`}
          >
            <LayoutGrid size={14} />
            <span>Tablero Activo</span>
            <span
              style={{
                backgroundColor: activeTab === 'board' ? '#171715' : '#444',
                color: activeTab === 'board' ? '#ffe526' : '#fff',
                padding: '1px 5px',
                fontSize: '9px',
                fontWeight: 900,
                borderRadius: '2px'
              }}
            >
              {activeIssuesCount}
            </span>
          </button>

          {/* Backlog */}
          <button
            onClick={() => setActiveTab('backlog')}
            className={`admin-tab-btn cursor-pointer ${activeTab === 'backlog' ? 'active' : 'inactive'}`}
          >
            <Inbox size={14} />
            <span>Backlog</span>
            <span
              style={{
                backgroundColor: activeTab === 'backlog' ? '#171715' : '#444',
                color: activeTab === 'backlog' ? '#ffe526' : '#fff',
                padding: '1px 5px',
                fontSize: '9px',
                fontWeight: 900,
                borderRadius: '2px'
              }}
            >
              {backlogIssuesCount}
            </span>
          </button>

          {/* Directorio CRM */}
          <button
            onClick={() => setActiveTab('directory')}
            className={`admin-tab-btn cursor-pointer ${activeTab === 'directory' ? 'active' : 'inactive'}`}
          >
            <Building size={14} />
            <span>Directorio CRM</span>
            <span
              style={{
                backgroundColor: activeTab === 'directory' ? '#171715' : '#444',
                color: activeTab === 'directory' ? '#ffe526' : '#fff',
                padding: '1px 5px',
                fontSize: '9px',
                fontWeight: 900,
                borderRadius: '2px'
              }}
            >
              {scopedCompanies.length}
            </span>
          </button>

          {/* Consultas Web */}
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`admin-tab-btn cursor-pointer ${activeTab === 'inquiries' ? 'active' : 'inactive'}`}
          >
            <MessageSquareText size={14} />
            <span>Consultas Web</span>
            {newInquiriesCount > 0 ? (
              <span
                style={{
                  backgroundColor: '#ff4b83',
                  color: '#ffffff',
                  padding: '1px 6px',
                  fontSize: '9px',
                  fontWeight: 900,
                  borderRadius: '2px'
                }}
                className="animate-pulse"
              >
                {newInquiriesCount} NUEVAS
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: activeTab === 'inquiries' ? '#171715' : '#444',
                  color: activeTab === 'inquiries' ? '#ffe526' : '#fff',
                  padding: '1px 5px',
                  fontSize: '9px',
                  fontWeight: 900,
                  borderRadius: '2px'
                }}
              >
                {inquiries.length}
              </span>
            )}
          </button>

        </div>

        {/* Right: Territory Filter & User Profile */}
        <div className="flex items-center space-x-2.5 w-full lg:w-auto justify-end">
          {isAdmin ? (
            <div className="flex items-center p-0.5 rounded-sm bg-neutral-900 border border-neutral-700 text-xs font-bold">
              <button
                onClick={() => setTerritoryFilter('all')}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: territoryFilter === 'all' ? '#ffe526' : 'transparent',
                  color: territoryFilter === 'all' ? '#171715' : '#aaa',
                  borderRadius: '2px'
                }}
                title="Ver todos los territorios"
              >
                🌐 Global
              </button>
              <button
                onClick={() => setTerritoryFilter('espana')}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: territoryFilter === 'espana' ? '#ffe526' : 'transparent',
                  color: territoryFilter === 'espana' ? '#171715' : '#aaa',
                  borderRadius: '2px'
                }}
                title="Filtrar por Valencia / España"
              >
                🇪🇸 Valencia
              </button>
              <button
                onClick={() => setTerritoryFilter('bariloche')}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  backgroundColor: territoryFilter === 'bariloche' ? '#ffe526' : 'transparent',
                  color: territoryFilter === 'bariloche' ? '#171715' : '#aaa',
                  borderRadius: '2px'
                }}
                title="Filtrar por Bariloche"
              >
                🇦🇷 Bariloche
              </button>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: '#ffe526',
                color: '#171715',
                padding: '4px 9px',
                fontSize: '10px',
                fontWeight: 900,
                borderRadius: '2px'
              }}
            >
              {currentUser.projectId === 'espana' ? '🇪🇸 Valencia' : '🇦🇷 Bariloche'}
            </div>
          )}

          {/* User Badge */}
          <div
            className="flex items-center gap-2 px-2.5 py-1"
            style={{
              backgroundColor: '#272725',
              border: '1px solid #444',
              borderRadius: '2px'
            }}
          >
            <UserCheck size={13} className="text-[#ffe526]" />
            <div className="text-left hidden sm:block leading-none">
              <span className="text-[11px] font-black text-white block">
                {currentUser.name}
              </span>
              <span className="text-[9px] text-neutral-400 font-mono">
                {currentUser.role}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#ff4b83',
              color: '#ffffff',
              border: '1.5px solid #ff4b83',
              boxShadow: '2px 2px 0 #000',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 900,
              borderRadius: '2px',
              cursor: 'pointer'
            }}
            title="Cerrar sesión"
          >
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 max-w-[1600px] w-full mx-auto">
        {activeTab === 'board' && (
          <JiraBoard
            issues={scopedIssues}
            onStatusChange={handleStatusChange}
            onDeleteIssue={handleDeleteIssue}
            onEditIssue={(issue) => {
              setEditingIssue(issue);
              setIsIssueModalOpen(true);
            }}
            onCreateIssue={() => {
              setEditingIssue(null);
              setDefaultCompanyForIssue(null);
              setIsIssueModalOpen(true);
            }}
            onOpenCompany={handleOpenCompanyDrawer}
            darkMode={darkMode}
            currentUserName={currentUser.name}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'backlog' && (
          <JiraBacklog
            issues={scopedIssues}
            companies={companies}
            onStatusChange={handleStatusChange}
            onQuickCreate={handleQuickCreateBacklog}
            onEditIssue={(issue) => {
              setEditingIssue(issue);
              setIsIssueModalOpen(true);
            }}
            onDeleteIssue={handleDeleteIssue}
            onOpenCompany={handleOpenCompanyDrawer}
            onOpenCreateModal={() => {
              setEditingIssue(null);
              setDefaultCompanyForIssue(null);
              setIsIssueModalOpen(true);
            }}
            darkMode={darkMode}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'directory' && (
          <CrmDirectory
            companies={scopedCompanies}
            onSelectCompany={(comp) => setSelectedCompany(comp)}
            onCreateCompany={handleCreateCompany}
            onUpdateCompany={handleUpdateCompany}
            onDeleteCompany={handleDeleteCompany}
            darkMode={darkMode}
            issues={issues}
            onOpenIssue={(issue) => {
              setEditingIssue(issue);
              setIsIssueModalOpen(true);
            }}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'inquiries' && (
          <WebInquiriesView
            inquiries={inquiries}
            onStatusChange={handleInquiryStatusChange}
            onAssignChange={handleInquiryAssignChange}
            onAddNote={handleInquiryAddNote}
            onDeleteInquiry={handleInquiryDelete}
            darkMode={darkMode}
            isAdmin={isAdmin}
            currentUserName={currentUser.name}
          />
        )}
      </main>

      {/* DRAWER: DETALLE CRM DE EMPRESA */}
      {selectedCompany && (
        <CrmCompanyDrawer
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onUpdateCompany={(id, updates) => handleUpdateCompany(id, updates)}
          onAddActivity={(companyId, act) => handleAddActivity(companyId, act)}
          onAddComment={(companyId, text) => handleAddComment(companyId, text)}
          onDeleteComment={(commentId, companyId) => handleDeleteComment(commentId, companyId)}
          onCreateIssueForCompany={(companyId) => handleCreateIssueForCompany(companyId)}
          onOpenIssue={(issue: JiraIssue) => {
            setEditingIssue(issue);
            setIsIssueModalOpen(true);
          }}
          darkMode={darkMode}
          currentUserName={currentUser.name}
        />
      )}

      {/* MODAL: CREAR / EDITAR INCIDENCIA DE JIRA */}
      <JiraIssueModal
        isOpen={isIssueModalOpen}
        onClose={() => {
          setIsIssueModalOpen(false);
          setEditingIssue(null);
          setDefaultCompanyForIssue(null);
        }}
        onSave={handleSaveIssue}
        editingIssue={editingIssue}
        companies={companies}
        defaultCompanyId={defaultCompanyForIssue}
        darkMode={darkMode}
        currentUser={currentUser}
      />

    </div>
  );
};
