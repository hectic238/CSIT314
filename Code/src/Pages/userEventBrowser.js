import React, { useState } from "react";
import Nav_Button from "../Components/Nav_button";
import eventsData from "../ExampleData/eventsData";
import "../Styles/common.css";

//date stuff
function parseDateString(dateStr) {
    const parsed = Date.parse(dateStr);
    if (!isNaN(parsed)) {
        return new Date(parsed);
    }
    return new Date(0);
}

const eventsWithParsedDates = eventsData.map((evt) => {
    return {
        ...evt,
        dateObj: parseDateString(evt.date),
    };
});

function UserEventBrowserCopy() {
    const [showFilters, setShowFilters] = useState(false);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [tempMaxPrice, setTempMaxPrice] = useState(1000);
    const [availableOnly, setAvailableOnly] = useState(false);
    const [eventType, setEventType] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handlePriceSlider = (e) => {
        setTempMaxPrice(Number(e.target.value));
    };

    const handleApplyFilters = () => {
        setMaxPrice(tempMaxPrice);
    };

    const handleAvailableToggle = () => {
        setAvailableOnly(!availableOnly);
    };

    const handleClearFilters = () => {
        setMaxPrice(1000);
        setTempMaxPrice(1000);
        setAvailableOnly(false);
        setEventType("");
        setSortOption("");
        setStartDate("");
        setEndDate("");
        setLocationFilter("");
    };

    let filteredEvents = eventsWithParsedDates.filter((item) => {
        if (item.price > maxPrice) return false;

        if (availableOnly && !item.availability) return false;

        if (eventType && eventType !== "" && eventType !== item.type) {
            return false;
        }

        if (locationFilter && locationFilter !== "" && !item.location.toLowerCase().includes(locationFilter.toLowerCase())) {
            return false;
        }

        if (startDate) {
            const start = new Date(startDate); 
            if (item.dateObj < start) {
                return false;
            }
        }

        if (endDate) {
            const end = new Date(endDate);
            if (item.dateObj > end) {
                return false;
            }
        }

        return true;
    });

    if (sortOption === "priceAsc") {
        filteredEvents.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
        filteredEvents.sort((a, b) => b.price - a.price);
    } else if (sortOption === "dateEarliest") {
        filteredEvents.sort((a, b) => a.dateObj - b.dateObj);
    } else if (sortOption === "dateLatest") {
        filteredEvents.sort((a, b) => b.dateObj - a.dateObj);
    }

    return (
        <div className="user-container">
            {/* nav buttons*/}
            <div className="user-nav">
                <Nav_Button to="/Event-Manager">
                    Event Manager
                </Nav_Button>
                <Nav_Button to="/Manage-Account">
                    Manage Account
                </Nav_Button>
            </div>

            {/* welcome text */}
            <div>
                <p>
                    <span className="welcome-highlight">
                        Welcome to "User Event Browser", the ultimate event management system.
                    </span>
                </p>
            </div>


            <div className="user-event-details">
            {/* filter menu*/}
            {showFilters && (
                    <div className="filter-panel">
                        {/* event type */}
                        <div className="filter-item">
                            <label>
                                Event Type:
                                <select
                                    value={eventType}
                                    onChange={(e) => setEventType(e.target.value)}>
                                    <option value="">All</option>
                                    <option value="music">Music</option>
                                    <option value="conference">Conference</option>
                                    <option value="networking">Networking</option>
                                </select>
                            </label>
                        </div>

                        {/* sort order */}
                        <div className="filter-item">
                            <label>
                                Sort by :
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    style={{ marginLeft: "0.5rem" }}
                                >   
                                    <option value="">(None)</option>
                                    <option value="priceAsc">Price Low-High</option>
                                    <option value="priceDesc">Price High-Low</option>
                                    <option value="dateEarliest">Date Earliest</option>
                                    <option value="dateLatest">Date Latest</option>
                                </select>
                            </label>
                        </div>

                        {/* date */}
                        <div className="filter-item">
                            <label>
                                Start Date:
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    style={{ marginLeft: "0.5rem" }}/>
                            </label>
                            <label className="end-date-label">
                                End Date:
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    style={{ marginLeft: "0.5rem" }}/>
                            </label>
                        </div>

                        {/* location */}
                        <div className="filter-item">
                        <label>
                                Location:
                                <input
                                    type="text"
                                    placeholder="e.g. Sydney"
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    style={{ marginLeft: "0.5rem" }}/>
                            </label>
                        </div>

                        {/* price range */}
                        <div className="filter-item">
                        <label>
                                Price up to: ${maxPrice}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={tempMaxPrice}
                                    onChange={(e) => {
                                        handlePriceSlider(e);
                                        handleApplyFilters();
                                      }}
                                    style={{ width: "150px", marginLeft: "1rem" }}/>
                            </label>
                        </div>

                        {/* available only */}
                        <div className="filter-item">
                            <div className="toggle-switch">
                                <label className="switch-label">
                                    Show available only
                                </label>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={availableOnly}
                                        onChange={handleAvailableToggle}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>

                        {/* clear filter */}
                        <div>
                            <button onClick={handleClearFilters} style={{ marginLeft: "0.5rem" }}>
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
                    <table className="event-table sticky-header">
                        <thead>
                            <tr>
                                <th>
                                    Events
                                    <button
                                        className="filter-button" 
                                        onClick={handleToggleFilters}>
                                        {/* filter symbol */}
                                        <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        style={{ marginRight: "6px", verticalAlign: "middle" }}
                                        fill="currentColor"
                                        aria-hidden="tarue">
                                            <path d="M2 2h20l-7.999 10.665V20l-4.002 2v-9.335z" />
                                        </svg>
                                        Filter
                                    </button>
                                </th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>{/* register */}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map((item, index) => (
                                <tr key={index} >
                                    <td className="name">{item.name}</td>
                                    <td className="date">{item.date}</td>
                                    <td className="location">{item.location}</td>
                                    <td className="price">${item.price}</td>
                                    <td className="register">
                                        <Nav_Button to={"/Register-Event"}>
                                            View ticket options 
                                        </Nav_Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    );
}

export default UserEventBrowserCopy;






