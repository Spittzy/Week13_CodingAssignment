import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.js'
import { fetchAllReviews, deleteReview, putReview, postReview } from './api'
import { numberOfStars } from './starSelection'



/* Coding Steps:
  Task 1: Create a new Vite project
  Task 2: Copy the CRD app code into the new project
  Task 3: Fix any Typescript type errors
  Task 4: Separate the code into multiple files
    Separate your CRD app  into at least 3 files (a main.ts file and at least 2 other files)
  Task 5: Testing
    *It should run with the Vite command "npm run dev"
    *It should be written in TypeScript
    *It should have no type errors
    *There should be at least 3 Typescript .ts files that use import and export to work together
*/
export type Review = {
  id: number
  author: string
  text: string
  stars: number
}

let reviewList: Review[] = [];
let reviewToEditId: null | number = null;
// let user: string = "";
//review form
const reviewsContainer = document.getElementById('finished-reviews') as HTMLDivElement;
const reviewTextarea = document.getElementById('review-textarea') as HTMLTextAreaElement;
const reviewUserName = document.getElementById('user-name') as HTMLInputElement;
//review stars
export const reviewStarsSelect = document.getElementById('review-stars-select') as HTMLButtonElement;
export const star1 = document.getElementById('str-btn-1') as HTMLButtonElement;
export const star2 = document.getElementById('str-btn-2') as HTMLButtonElement;
export const star3 = document.getElementById('str-btn-3') as HTMLButtonElement;
export const star4 = document.getElementById('str-btn-4') as HTMLButtonElement;
export const star5 = document.getElementById('str-btn-5') as HTMLButtonElement;


function renderReviewList() {
  //clear out anything from previous renders
  reviewsContainer.innerHTML = "";

  //if there's no reviews, show and empty message
  if (reviewList.length === 0) {
    reviewsContainer.innerHTML = "No reviews yet"
  }
  //for each review, map it to a div, then append that div to the container
  reviewList.map(renderReview).forEach(div => reviewsContainer.appendChild(div))
}

/**
 * render one review
 */
function renderReview(review: Review) {
  const reviewDiv = document.createElement('div')
  reviewDiv.className = "card-body bg-light mb-3 p-4"
  reviewDiv.innerHTML = `
        <h4>${review.author}</h4>
        <p>${Array(review.stars).fill(null).map(_ => '⭐').join('')}</p>
        <p>${review.text}</p>
        <button id="edit-button" class="btn btn-dark">Edit</button>
        <button id="delete-button" class="btn btn-dark">Delete</button>
        `
  //attach the event listener to the edit button that gets the form ready to edit
  reviewDiv.querySelector('#edit-button')!.addEventListener('click', () => {
    reviewToEditId = review.id
    renderReviewForm(review)
  })
  reviewDiv.querySelector('#delete-button')!.addEventListener('click', async () => {
    //delete on the backend first
    await deleteReview(review.id)
    //delete on the front end
    const indexToDelete = reviewList.indexOf(review)
    reviewList.splice(indexToDelete, 1)

    renderReviewList()
  })
  return reviewDiv
}


/**
 * update the review form to match the review data given
 */

function renderReviewForm(reviewData: { stars: number, text: string, author: string }) {
  numberOfStars(reviewStarsSelect);
  reviewStarsSelect.value = reviewData.stars.toString()
  reviewUserName.value = reviewData.author
  reviewTextarea.value = reviewData.text
}
/**
 * when the save button is clicked, either save an edit or a create
 */
async function onSaveReviewClick(event: Event) {

  event.preventDefault()
  const reviewData = {
    author: reviewUserName.value,
    text: reviewTextarea.value,
    stars: parseInt(reviewStarsSelect.value)
  }

  if (reviewToEditId !== null) {
    //update on backend update
    //new
    const reviewToUpdate = {
      ...reviewData,
      id: reviewToEditId
    }

    await putReview(reviewToUpdate)

    //update on frontend
    const indexToReplace = reviewList.findIndex(r => r.id === reviewToEditId)
    reviewList[indexToReplace] = reviewToUpdate
  }
  else {
    //update on backend create
    const createdReview = await postReview(reviewData)

    //udate on frontend
    reviewList.push(createdReview)
  }
  renderReviewList()
  reviewToEditId = null
  //clear the form
  renderReviewForm({ stars: 1, author: '', text: '' })
}


//START UP

async function startUp() {
  //add click event listener for buttons
  star1.addEventListener('click', (event) => numberOfStars(event.target as HTMLButtonElement));
  star2.addEventListener('click', (event) => numberOfStars(event.target as HTMLButtonElement));
  star3.addEventListener('click', (event) => numberOfStars(event.target as HTMLButtonElement));
  star4.addEventListener('click', (event) => numberOfStars(event.target as HTMLButtonElement));
  star5.addEventListener('click', (event) => numberOfStars(event.target as HTMLButtonElement));

  document.getElementById('save-btn')!.addEventListener('click', onSaveReviewClick);

  //fetch and render reviews
  reviewList = await fetchAllReviews()
  renderReviewList()

}
startUp()
