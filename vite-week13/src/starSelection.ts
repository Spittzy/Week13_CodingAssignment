import { reviewStarsSelect, star1, star2, star3, star4, star5 } from "./main";
/**
 * 
 * @param {*} selection btn clicked  descides the value reviewStarsSelect
 */
export function numberOfStars(selection: HTMLButtonElement) {

    console.log('Clicked button:', selection.id); // Debugging
    switch (selection.id) {
        case 'str-btn-1':
            reviewStarsSelect.value = '1';
            star1.innerHTML = "🌟";
            star2.innerHTML = "⭐";
            star3.innerHTML = "⭐";
            star4.innerHTML = "⭐";
            star5.innerHTML = "⭐";
            break;
        case 'str-btn-2':
            reviewStarsSelect.value = '2';
            star1.innerHTML = "🌟";
            star2.innerHTML = "🌟";
            star3.innerHTML = "⭐";
            star4.innerHTML = "⭐";
            star5.innerHTML = "⭐";
            break;
        case 'str-btn-3':
            reviewStarsSelect.value = '3';
            star1.innerHTML = "🌟";
            star2.innerHTML = "🌟";
            star3.innerHTML = "🌟";
            star4.innerHTML = "⭐";
            star5.innerHTML = "⭐";
            break;
        case 'str-btn-4':
            reviewStarsSelect.value = '4';
            star1.innerHTML = "🌟";
            star2.innerHTML = "🌟";
            star3.innerHTML = "🌟";
            star4.innerHTML = "🌟";
            star5.innerHTML = "⭐";
            break;
        case 'str-btn-5':
            reviewStarsSelect.value = '5';
            star1.innerHTML = "🌟";
            star2.innerHTML = "🌟";
            star3.innerHTML = "🌟";
            star4.innerHTML = "🌟";
            star5.innerHTML = "🌟";
            break;
        default:
            reviewStarsSelect.value = '0';
            star1.innerHTML = "⭐";
            star2.innerHTML = "⭐";
            star3.innerHTML = "⭐";
            star4.innerHTML = "⭐";
            star5.innerHTML = "⭐";

    }
    console.log('Updated reviewStarsSelect value:', reviewStarsSelect.value); // Debugging
}