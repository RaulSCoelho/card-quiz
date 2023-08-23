import { usersApi } from '@/server/prisma/users'

import { Users } from '.'

export const metadata = {
  title: 'Users'
}

export default async function Page() {
  const { users } = await usersApi.get()

  return (
    <div className="flex justify-center px-2">
      <Users users={users || []} />
    </div>
  )
}
