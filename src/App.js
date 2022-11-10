import "./index.css";
import { BiCalendar } from "react-icons/bi";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {
	const [appointmentList, setAppointmentList] = useState([]);
	const [query, setQuery] = useState("");

	// states for sorting
	const [sortBy, setSortBy] = useState("petName");
	const [orderBy, setOrderBy] = useState("asc");

	// create appointments list that filters the search query
	const queriedAppointments = appointmentList
		.filter((item) => {
			return (
				item.petName.toLowerCase().includes(query.toLowerCase()) ||
				item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
				item.aptNotes.toLowerCase().includes(query.toLowerCase())
			);
		})
		// Sort the appointments
		.sort((a, b) => {
			let order = orderBy === "asc" ? 1 : -1;
			return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
				? -1 * order
				: 1 * order;
		});

	// mimic the fetching of API from the json data in public directory
	useEffect(() => {
		fetch("./data.json")
			.then((response) => response.json())
			.then((data) => setAppointmentList(data));
	}, []);

	return (
		<div className="App container mx-auto mt-3 font-thin">
			<h1 className="text-5xl mb-3">
				<BiCalendar className="inline-block align-top mr-3" />
				Your Appointments
			</h1>
			<AddAppointment
				onSendAppointment={(myAppointment) =>
					setAppointmentList([...appointmentList, myAppointment])
				}
				lastId={appointmentList.reduce(
					(max, item) =>
						Number(item.id) > max ? Number(item.id) : max,
					0
				)}
			/>
			<Search
				// Define props to pass down to Search. Search passes down same props to dropdown, which on clicked will pass back up to change the state.
				searchQuery={query}
				onSearchInput={(searchQuery) => setQuery(searchQuery)}
				orderBy={orderBy}
				onOrderByChange={(myOrder) => setOrderBy(myOrder)}
				sortBy={sortBy}
				onSortByChange={(mySort) => setSortBy(mySort)}
			/>
			<ul className="divide-y divide-gray-200">
				{queriedAppointments.map((appointment) => (
					<AppointmentInfo
						key={appointment.id}
						appointmentData={appointment}
						// Method passed down as props to AppointmentInfo, which passes back up the appointment id to delete when button is clicked and method is called
						// Filter returns a new array of the filtered items that pass the condition: if appointment id is not the same as the one we've requested the deletion of. Set the state of the appointment list with the newly filtered array.
						deleteAppointment={(appointmentId) =>
							setAppointmentList(
								appointmentList.filter(
									(appointment) => appointment.id !== appointmentId
								)
							)
						}
					/>
				))}
			</ul>
		</div>
	);
}

export default App;
