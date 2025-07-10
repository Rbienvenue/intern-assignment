import { UsersTable} from '@/components/user/users-table'
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge" 
import prisma from '@/lib/db'

export default async function Users() {
    const users = await prisma.users.findMany()
    return <>
        <UsersTable users={users} />:
        <Card>
            <CardHeader>
                <CardTitle>User Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">Daily Active</p>
                            <p className="text-sm text-gray-600">Average per day</p>
                        </div>
                        <Badge variant="default">{Math.floor(users.length * 0.3)}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">Retention Rate</p>
                            <p className="text-sm text-gray-600">30-day retention</p>
                        </div>
                        <Badge variant="secondary">78%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">Avg. Session</p>
                            <p className="text-sm text-gray-600">Time per session</p>
                        </div>
                        <Badge variant="outline">12m 34s</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>

    </>



}