import { UsersTable } from '.'

export const metadata = {
  title: 'Users'
}

export default function Page() {
  return (
    <div className="flex justify-center px-2">
      <UsersTable />
    </div>
  )
}
