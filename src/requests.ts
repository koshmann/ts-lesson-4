import { CarCategory, Place, Schedule } from './private';

// export type GetCarCategoriesList = {
// 	method: 'GET',
// 	url: 'http://faceprog.ru/tsapi/car-categories/',
// 	success: CarCategory[]
// }

// export type GetPlacesList = {
// 	method: 'GET',
// 	url: 'http://faceprog.ru/tsapi/places/',
// 	success: Place[]
// }

// export type GetSchedule= {
// 	method: 'GET',
// 	url: `http://faceprog.ru/tsapi/schedule/`,
// 	params: { place_id: number },
// 	success: Schedule
// }

export const makeFetch = async <T>(url:string, method: "GET" | "POST"):Promise<T> => {
	const response = await fetch(url, {method: method})
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}
	return response.json()
}

export const getCarCategories = () => makeFetch<CarCategory[]>("http://faceprog.ru/tsapi/car-categories/", "GET")
export const getPlaces = () => makeFetch<Place[]>("http://faceprog.ru/tsapi/places/", "GET")
export const getSchedule = (id:number) => makeFetch<Schedule>(`/tsapi/schedule?place_id=${id}`, "GET")

