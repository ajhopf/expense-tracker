'use client'

import NewTransaction from "@/components/new-transaction/new-transaction";
import NewAccount from "@/components/account/new-account";
import NewCategory from "@/components/category/new-category";
import Overview from "@/components/overview/overview";

export default function DashboardPage() {
	return <>
		<h1>Dashboard</h1>
		<div className="flex">
			<NewTransaction/>
			<Overview/>
		</div>


		<NewCategory/>
		<hr/>

	</>
}