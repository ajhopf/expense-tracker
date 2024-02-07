import { addDoc, collection, getFirestore, where, query, getDocs, or } from "@firebase/firestore";
import firebaseApp from "@/firebase/config";
import { DocumentData } from "@firebase/firestore";
import { Category } from "@/models/category";

const db = getFirestore(firebaseApp);


export async function addCategory(category: Category) {
	try {
		const categoryAsDocumentData = category as DocumentData;

		const docRef =
			await addDoc(collection(db, "categories"), {
				category: categoryAsDocumentData.name,
				color: categoryAsDocumentData.color,
				userId: categoryAsDocumentData.userId
			})

		console.log("document written with id :", docRef.id)
	} catch (e) {
		console.error("Error adding category: ", e)
	}
}

export async function getUserCategories(userId) {
	const userCategories = [];
	try {
		const categoriesRef = await collection(db, "categories");
		const q = query(categoriesRef, or(
			where("userId", "==", userId),
			where("userId", "==", "default")));
		const categoriesSnapshot = await getDocs(q);
		categoriesSnapshot.forEach(category => {
			userCategories.push({id: category.id,...category.data()})
		})
		return userCategories
	} catch (e) {
		console.error(e);
	}
}