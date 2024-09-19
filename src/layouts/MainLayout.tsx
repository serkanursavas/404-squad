import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="md:flex">
      <nav className="fixed bottom-0 w-full bg-slate-500 md:static">Sidebar</nav>
      <div>
        <header className="bg-purple-400"></header>
        <main className="bg-yellow-200">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
