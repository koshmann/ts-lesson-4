import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { CarCategory, Place } from './private'
import { getPlaces } from './requests'
import { Controller, useFormContext } from 'react-hook-form'

export default function PlaceSelect() {

	const { isLoading, isError, isSuccess, data } = useQuery<Place[]>(['places'], getPlaces, { staleTime: Infinity })

	const { control, watch } = useFormContext();
	const category:CarCategory = watch("category")

	if (!category || category.id === 0) { return null }
	if (isLoading) { return <p>Loading...</p> }
	if (isError) { return <p>Error...</p> }

	if (isSuccess && data) {
		return (
			<Controller control={control} defaultValue={data[0]} name="place" render={({ field: { value, onChange } }) => (
				<Listbox value={value} onChange={onChange}>
					<div className="relative mt-1">
						<Listbox.Label className="mb-1 block">Пункты осмотра:</Listbox.Label>
						<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
							<span className="block truncate">{value?.title || "Выберите пункт"}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{data.map((place, placeIdx) => (
									<Listbox.Option
										key={placeIdx}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
											}`
										}
										value={place}
									>
										{({ selected }) => (
											<>
												<span
													className={`block truncate ${selected ? 'font-medium' : 'font-normal'
														}`}
												>
													{place.title}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
			)} />
		)
	}

	return null
}