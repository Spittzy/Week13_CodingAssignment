
import { Review } from './main'


//fetching
export async function fetchAllReviews() {
    const response2 = await fetch('http://localhost:3000/reviews/')
    return response2.json()
}

export async function postReview(newReviewData: { stars: number, text: string, author: string }) {
    const response = await fetch('http://localhost:3000/reviews/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReviewData)
    })
    return response.json()
}

export async function putReview(updateReview: Review) {
    await fetch(`http://localhost:3000/reviews/${updateReview.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateReview)
    })

}

export async function deleteReview(idToDelete: number) {
    await fetch('http://localhost:3000/reviews/' + idToDelete, {
        method: "DELETE"
    })
}