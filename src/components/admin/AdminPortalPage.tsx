import React, { useState, useEffect } from 'react';
import { getCurrentUser, logoutUser } from '../../services/authService';
import type { User } from '../../services/authService';
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
  subscribeToCrmChanges 
} from '../../services/crmService';
import type { CrmCompany, CrmActivity } from '../../services/crmService';
import { AdminLoginPage } from './AdminLoginPage';
import { JiraBoard } from './JiraBoard';
import { JiraBacklog } from './JiraBacklog';
import { CrmDirectory } from './CrmDirectory';
import { CrmCompanyDrawer } from './CrmCompanyDrawer';
import { JiraIssueModal } from './JiraIssueModal';
import { 
  Cpu, 
  LayoutGrid, 
  Inbox, 
  Building, 
  LogOut, 
  ArrowLeft 
} from 'lucide-react';

interface AdminPortalPageProps {
  onReturnToSite: () => void;
  darkMode: boolean;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({ onReturnToSite, darkMode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [activeTab, setActiveTab] = useState<'board' | 'backlog' | 'directory'>('board');
  
  // Data States
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [companies, setCompanies] = useState<CrmCompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CrmCompany | null>(null);

  // Modal States
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<JiraIssue | null>(null);
  const [defaultCompanyForIssue, setDefaultCompanyForIssue] = useState<string | null>(null);

  // Initial Data Load
  const refreshAllData = async () => {
    const [fetchedIssues, fetchedCompanies] = await Promise.all([
      fetchJiraIssues(),
      fetchCompanies()
    ]);
    setIssues(fetchedIssues);
    setCompanies(fetchedCompanies);

    // Refresh selected company drawer if open
    if (selectedCompany) {
      const refreshedDetail = await fetchCompanyDetail(selectedCompany.id);
      if (refreshedDetail) {
        setSelectedCompany(refreshedDetail);
      }
    }
  };

  useEffect(() => {
    refreshAllData();

    // Subscribe to Live Sync Channels
    const unsubJira = subscribeToJiraChanges(() => refreshAllData());
    const unsubCrm = subscribeToCrmChanges(() => refreshAllData());

    return () => {
      unsubJira();
      unsubCrm();
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
        darkMode={darkMode}
      />
    );
  }

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // Jira Handlers
  const handleStatusChange = async (id: string, newStatus: JiraStatus) => {
    // Optimistic UI update
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

  const activeIssuesCount = issues.filter(i => i.status !== 'backlog').length;
  const backlogIssuesCount = issues.filter(i => i.status === 'backlog').length;

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Top Main Navigation Header */}
      <header className={`px-6 py-3.5 border-b flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        
        {/* Brand & Platform Identifier */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onReturnToSite}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Volver a la Web Pública"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md">
              <Cpu size={20} />
            </div>
            <div>
              <h1 className="font-heading font-black text-lg leading-none flex items-center gap-2">
                <span>Plataforma de Trabajo &amp; CRM</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  SQLite Live Sync
                </span>
              </h1>
              <span className="text-xs text-slate-400 font-medium">iAtomica Jira Suite &amp; CRM 360°</span>
            </div>
          </div>
        </div>

        {/* Central Jira / CRM Module Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold">
          
          {/* Tablero Activo */}
          <button
            onClick={() => setActiveTab('board')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-2 ${
              activeTab === 'board'
                ? 'gradient-brand text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid size={15} />
            <span>Tablero Activo</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeTab === 'board' ? 'bg-white/20 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}>
              {activeIssuesCount}
            </span>
          </button>

          {/* Backlog */}
          <button
            onClick={() => setActiveTab('backlog')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-2 ${
              activeTab === 'backlog'
                ? 'gradient-brand text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Inbox size={15} />
            <span>Backlog</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeTab === 'backlog' ? 'bg-white/20 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}>
              {backlogIssuesCount}
            </span>
          </button>

          {/* Directorio CRM */}
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-2 ${
              activeTab === 'directory'
                ? 'gradient-brand text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building size={15} />
            <span>Directorio CRM</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeTab === 'directory' ? 'bg-white/20 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}>
              {companies.length}
            </span>
          </button>

        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-800">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-9 h-9 rounded-full object-cover border border-purple-500" 
            />
            <div className="hidden sm:block text-left">
              <h4 className="text-xs font-bold leading-tight">{currentUser.name}</h4>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold block">
                {currentUser.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-rose-600 transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

      </header>

      {/* Main Module Content View */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* Module 1: Jira Board */}
        {activeTab === 'board' && (
          <JiraBoard
            issues={issues}
            onStatusChange={handleStatusChange}
            onDeleteIssue={handleDeleteIssue}
            onEditIssue={(issue) => {
              setEditingIssue(issue);
              setDefaultCompanyForIssue(issue.companyId || null);
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
          />
        )}

        {/* Module 2: Jira Backlog */}
        {activeTab === 'backlog' && (
          <JiraBacklog
            issues={issues}
            companies={companies}
            onStatusChange={handleStatusChange}
            onQuickCreate={handleQuickCreateBacklog}
            onEditIssue={(issue) => {
              setEditingIssue(issue);
              setDefaultCompanyForIssue(issue.companyId || null);
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
          />
        )}

        {/* Module 3: CRM Directory 360° */}
        {activeTab === 'directory' && (
          <CrmDirectory
            companies={companies}
            onSelectCompany={(company) => handleOpenCompanyDrawer(company.id)}
            onCreateCompany={handleCreateCompany}
            onDeleteCompany={handleDeleteCompany}
            darkMode={darkMode}
          />
        )}

      </main>

      {/* Slide-over Drawer for Company 360° Inspection & Commercial History */}
      <CrmCompanyDrawer
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onUpdateCompany={handleUpdateCompany}
        onAddActivity={handleAddActivity}
        onCreateIssueForCompany={handleCreateIssueForCompany}
        onOpenIssue={(issue) => {
          setEditingIssue(issue);
          setIsIssueModalOpen(true);
        }}
        darkMode={darkMode}
        currentUserName={currentUser.name}
      />

      {/* Modal for Creating / Editing Jira Issues */}
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
      />

    </div>
  );
};
