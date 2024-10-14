import Button from '../../components/ui/Button'
import { Link } from 'react-router-dom'

export default function AdminHome() {
  return (
    <div className="absolute top-0 left-0 z-0 flex flex-col items-center justify-center w-full min-h-screen space-y-16 overflow-hidden">
      <h2 className="text-2xl text-primary">MANAGE</h2>
      <div className="flex flex-col items-center justify-center w-1/2 space-y-16 ">
        <Link
          to={'/admin/users'}
          className="w-full"
        >
          <div>
            <Button
              label="Users"
              className="w-full bg-white"
            />
          </div>
        </Link>
        <Link
          to={'/admin/matches'}
          className="w-full"
        >
          <div>
            <Button
              label="Matches"
              className="w-full bg-white"
            />
          </div>
        </Link>
        <Link
          to={'/admin/players'}
          className="w-full "
        >
          <div>
            <Button
              label="Players"
              className="w-full bg-white"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
