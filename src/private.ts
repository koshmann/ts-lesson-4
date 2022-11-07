export interface CarCategory{
	id: number,
	code: string,
	description: string
}

export interface Place{
	id: number,
	title: string,
	address: string,
	coords: Coords,
	available_car_category: InspectionPrice[]
}

export interface Schedule{
	days: DateYMDString[],
	times: TimesByDay
}

export interface Inspection{
	id: number,
	place_id: number,
	car_category_id: number,
	price: number,
	visit_planned_date: DateYMDString,
	visit_planned_time: DateHIString
}

export interface StoreRejected{
	messages: {
		[ key: string ]: string
	}
}

interface Coords{
	lat: number,
	lng: number
}

interface InspectionPrice{
	car_category_id: number,
	price: number
}

type d = 1|2|3|4|5|6|7|8|9|0;
type oneToNine = 1|2|3|4|5|6|7|8|9;
type MM = `0${oneToNine}` | `1${0|1|2}`;
type DD = `${0}${oneToNine}` | `${1|2}${d}` | `3${0|1}`;
type YYYY = `202${d}`;
type HH = `0${oneToNine}` | `1${d}` | `2${ 0 | 1 | 2  |3 }`;
type II = `0${oneToNine}` | `1${d}` | `2${d}`| `3${d}`| `4${d}`| `5${d}`;

type Div5 = 0 | 5; 
type IIof5 = `0${Div5}` | `1${Div5}` | `2${Div5}`| `3${Div5}`| `4${Div5}`| `5${Div5}`;

type DateYMDString = `${YYYY}-${MM}-${DD}`;
type DateHIString = `${HH}:${II}`;
type DateHIStringDivisibleOf5 = `${HH}:${IIof5}`;

type Dictionary<T extends string, U> = {
	[key in T]?: U;
};

export type TimesByDay = Dictionary<DateYMDString, DateHIStringDivisibleOf5[]>;



