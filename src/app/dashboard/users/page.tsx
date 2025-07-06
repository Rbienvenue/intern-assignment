import {UsersTable} from '@/components/user/users-table'
import prisma from '@/lib/db'

export default async function Users(){
    const users = await prisma.users.findMany()
    return <UsersTable users={users} />
}