export type JiraIssueType = 'lead' | 'task' | 'consulting' | 'automation' | 'bug';

export type JiraStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'negotiation' | 'done';

export type JiraPriority = 'highest' | 'high' | 'medium' | 'low';

export interface JiraIssue {
  id: string;
  issueKey: string;
  title: string;
  description: string;
  type: JiraIssueType;
  status: JiraStatus;
  priority: JiraPriority;
  companyId?: string | null;
  companyName?: string | null;
  companyContactName?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  assignedTo: string;
  storyPoints?: number;
  value?: number;
  territory?: string;
  dueDate?: string | null;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  content: string;
  type: 'note' | 'whatsapp' | 'call' | 'meeting' | 'status_change';
  createdAt: string;
}

const STORAGE_KEY = 'iatomica_jira_issues_cache_v3';
const SYNC_CHANNEL_NAME = 'iatomica_jira_live_sync';
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

let syncChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    syncChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
  } catch (e) {
    console.warn('BroadcastChannel not supported for Jira');
  }
}

const notifyLiveSync = () => {
  if (syncChannel) {
    syncChannel.postMessage({ type: 'JIRA_UPDATED', timestamp: Date.now() });
  }
};

let cachedIssues: JiraIssue[] = [];

export const fetchJiraIssues = async (): Promise<JiraIssue[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/jira/issues`);
    if (res.ok) {
      const data = await res.json();
      cachedIssues = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Jira API offline, using cache');
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      cachedIssues = JSON.parse(raw);
      return cachedIssues;
    }
  } catch (e) {
    // ignore
  }

  return cachedIssues;
};

export const subscribeToJiraChanges = (callback: () => void) => {
  if (syncChannel) {
    const handler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'JIRA_UPDATED') {
        fetchJiraIssues().then(() => callback());
      }
    };
    syncChannel.addEventListener('message', handler);
    return () => syncChannel?.removeEventListener('message', handler);
  }
  return () => {};
};

export const createJiraIssue = async (newIssue: Omit<JiraIssue, 'id' | 'issueKey' | 'createdAt' | 'updatedAt'>): Promise<JiraIssue | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/jira/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue)
    });
    if (res.ok) {
      const created = await res.json();
      await fetchJiraIssues();
      notifyLiveSync();
      return created;
    }
  } catch (err) {
    console.warn('Error creating Jira issue:', err);
  }
  return null;
};

export const updateJiraIssue = async (id: string, updates: Partial<JiraIssue>): Promise<JiraIssue | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/jira/issues/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      await fetchJiraIssues();
      notifyLiveSync();
      return updated;
    }
  } catch (err) {
    console.warn('Error updating Jira issue:', err);
  }
  return null;
};

export const updateIssueStatus = async (id: string, status: JiraStatus): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/jira/issues/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      await fetchJiraIssues();
      notifyLiveSync();
      return true;
    }
  } catch (err) {
    console.warn('Error updating issue status:', err);
  }
  return false;
};

export const updateIssueAssignee = async (id: string, assignedTo: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/jira/issues/${id}/assign`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignedTo })
    });
    if (res.ok) {
      await fetchJiraIssues();
      notifyLiveSync();
      return true;
    }
  } catch (err) {
    console.warn('Error updating assignee:', err);
  }
  return false;
};

export const deleteJiraIssue = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/jira/issues/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      await fetchJiraIssues();
      notifyLiveSync();
      return true;
    }
  } catch (err) {
    console.warn('Error deleting issue:', err);
  }
  return false;
};

export const fetchTicketComments = async (ticketId: string): Promise<TicketComment[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/jira/issues/${ticketId}/comments`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Error fetching ticket comments:', err);
  }
  return [];
};

export const addTicketComment = async (
  ticketId: string,
  commentData: { authorId: string; authorName: string; content: string; type?: string }
): Promise<TicketComment | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/jira/issues/${ticketId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    });
    if (res.ok) {
      notifyLiveSync();
      return await res.json();
    }
  } catch (err) {
    console.warn('Error adding ticket comment:', err);
  }
  return null;
};
