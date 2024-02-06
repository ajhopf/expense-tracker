'use client'

import NewTransaction from "@/components/new-transaction/new-transaction";
import NewAccount from "@/components/account/new-account";

export default function DashboardPage() {
	return <>
		<h1>Dashboard</h1>
		<NewAccount/>
		<NewTransaction/>
	</>
}