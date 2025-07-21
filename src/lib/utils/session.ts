// ユーザーセッション管理ユーティリティ

const SESSION_KEY = 'drabaka_user_session';

// ランダムなセッションIDを生成
function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `session_${timestamp}_${randomStr}`;
}

// ユーザーセッションIDを取得（ない場合は新規作成）
export function getUserSession(): string {
  if (typeof window === 'undefined') {
    // サーバーサイドの場合は一時的なIDを返す
    return 'server_session';
  }
  
  let sessionId = localStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
}

// セッションIDをリセット（新しいセッションを開始）
export function resetUserSession(): string {
  if (typeof window === 'undefined') {
    return 'server_session';
  }
  
  const newSessionId = generateSessionId();
  localStorage.setItem(SESSION_KEY, newSessionId);
  return newSessionId;
}

// セッションが有効かチェック（必要に応じて期限チェックなど）
export function isValidSession(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const sessionId = localStorage.getItem(SESSION_KEY);
  return sessionId !== null && sessionId.length > 0;
}