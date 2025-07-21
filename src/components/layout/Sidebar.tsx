interface SidebarProps {
  side: 'left' | 'right';
  children?: React.ReactNode;
}

export default function Sidebar({ side, children }: SidebarProps) {
  const sidebarClass = side === 'left' ? 'left-sidebar' : 'right-sidebar';
  
  return (
    <aside className={`sidebar ${sidebarClass}`}>
      {children || (
        <div className="retro-panel">
          <div className="panel-header">
            {side === 'left' ? '📋 ナビ' : '📊 統計'}
          </div>
          <div className="panel-content">
            <p className="color-muted">
              {side === 'left' 
                ? 'サイドメニューエリア' 
                : 'サイド統計エリア'
              }
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}