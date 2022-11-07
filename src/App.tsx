import { useForm, FormProvider } from "react-hook-form";
import Category from "./Category"
import Place from "./Place"
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import DaySelect from "./Day";
import TimeSelect from "./Time";

const queryClient = new QueryClient()

function App() {

	const formMethods = useForm();
	const { watch } = formMethods;

	const onSubmit = (data: any) => alert(JSON.stringify(data));

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<header className="bg-white shadow">
					<div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">TS Lesson 4</h1>
					</div>
				</header>
				<main>
					<FormProvider {...formMethods}>
						<form onSubmit={formMethods.handleSubmit(onSubmit)}>
							<div className="mx-auto max-w-5xl py-6 sm:px-6 lg:px-8 bg-slate-100 rounded-xl mt-4 grid lg:grid-cols-4 gap-8">
								<Category />
								<Place />
								<DaySelect />
								<TimeSelect />
							</div>
							<div className="text-center mt-6">
								<button type="submit">Submit</button>
							</div>
						</form>
					</FormProvider>
				</main>
			</div>
		</QueryClientProvider>
	)
}

export default App
