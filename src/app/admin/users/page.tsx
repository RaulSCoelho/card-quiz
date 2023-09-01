import { usersApi } from '@/server/prisma/users'

import { Users } from '.'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Users'
}

export default async function Page() {
  const { users } = await usersApi.get()

  return (
    <div className="flex justify-center">
      <Users users={users || []} />
    </div>
  )
}
