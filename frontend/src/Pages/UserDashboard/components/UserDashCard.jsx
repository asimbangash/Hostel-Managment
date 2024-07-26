import React from 'react'
import { Link } from 'react-router-dom'

const UserDashCard = ({ title, subtitle, bgColor }) => {
    return (
        <div className={`bg-[${bgColor}] text-white p-5`}>
            <p>{title}</p>
            <h4>{subtitle}</h4>
        </div>
    )
}

export default UserDashCard