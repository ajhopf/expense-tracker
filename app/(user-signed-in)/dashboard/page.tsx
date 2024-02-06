'use client'

import NewTransaction from "@/components/new-transaction/new-transaction";
import NewAccount from "@/components/account/new-account";
import NewCategory from "@/components/category/new-category";
import Overview from "@/components/overview/overview";

export default function DashboardPage() {
	return <>
		<h1>Dashboard</h1>
		<NewAccount/>
		<NewTransaction/>

		<NewCategory/>
		<hr/>
		<Overview/>
	</>
}