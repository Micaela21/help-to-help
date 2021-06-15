import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { osUser } from "../../Actions/Actions";
import OScard from "./OScard";
import './OScatalogue.css'

const OScatalogue = () => {

    const dispatch = useDispatch()
    const osUsers = useSelector(store => store.osUser)

    useEffect(() => {
        dispatch(osUser())
    },[])

    return (
        <div className={'osContainer'}>
            {osUsers.map(obj => {
                return (
                    <div className={'osCard'}>
                        <OScard props={obj}/>
                    </div>
                )
            })}
        </div>
    );
};

export default OScatalogue;