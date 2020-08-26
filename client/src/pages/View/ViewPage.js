import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {Loader} from "../../components/Loader";


export const ViewPage = () => {
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [dataFlag, setDataFlag] = useState(false);
    const [view, setView] = useState({
        date: new Date(),
        session: '',
        editDate: '',
        times: [],
        classrooms: [
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]},
            {name: '', subjects: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]}
        ]
    });
    const [clock, setClock] = useState({clock: '', clockDate: '', clockDay: ''});
    const [announcement, setAnnouncement] = useState({
        announcements: [],
        announcementDir: ''
    });
    const [announcementText, setAnnouncementText] = useState({text: '', date: new Date() - 55000});
    const [count, setCount] = useState({count: 0});
    const [countAd, setCountAd] = useState({count: 0});
    const [dir, setDir] = useState({name: '', text: '', urlImage: ''});
    const [flagDirImage, setFlagDirImage] = useState(false);
    const [ad, setAd] = useState({ad: []});
    const [adImage, setAdImage] = useState({url: '', date: new Date() - 70000});
    const [flagAd, setFlagAd] = useState(false);

    const schoolId = useParams().id;

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/view/get/${schoolId}`, 'GET', null);
            setView({...fetched, date: new Date()});
        } catch (e) {

        }
    }, [schoolId, request]);

    const getDataDirector = useCallback(async () => {
        try {
            const fetched = await request(`/api/dir/get_data/${schoolId}`, 'GET', null);
            setDir(fetched);
            setFlagDirImage(true);
        } catch (e) {

        }
    }, [schoolId, request]);

    const getDataAd = useCallback(async () => {
        try {
            const fetched = await request(`/api/ad/get_data_ad/${schoolId}`, 'GET', null, {"Content-Type": "text/plain"});
            setAd({ad: fetched.ad});
            setFlagAd(true)
        } catch (e) {
            console.log(e)
        }
    }, [schoolId, request]);

    const getDataAnnouncement = useCallback(async () => {
        try {
            const fetched = await request(`/api/view/get_announcement/${schoolId}`, 'GET', null);
            setAnnouncement(fetched);
        } catch (e) {

        }
    }, [schoolId, request]);


    const clockLauncher = () => {
        setInterval(() => {
            let date = new Date();
            setClock({
                clock: date.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'}),
                clockDate: date.toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric'}),
                clockDay: date.toLocaleString("ru", {weekday: 'long'})
            });
        }, 1000);
    };
    const announcementSwitcher = () => {
        try {
            setAnnouncementText({text: announcement.announcements[count.count], date: new Date()});
            setCount({count: count.count + 1});
            if (count.count === announcement.announcements.length - 1) {
                setCount({count: 0});
            }
        } catch (e) {
        }
    };

    const adSwitcher = () => {
        try {
            setAdImage({url: `/api/ad/get/${ad.ad[countAd.count]._id}`, date: new Date()});
            setFlagAd(true);
            setCountAd({count: countAd.count + 1});
            if (countAd.count === ad.ad.length - 1) {
                setCountAd({count: 0});
            }
        } catch (e) {
        }
    };

    useEffect(() => {
        getData();
        getDataDirector();
        getDataAnnouncement();
        getDataAd();
    }, [getData, getDataDirector, getDataAnnouncement, getDataAd]);

    useEffect(() => {
        clockLauncher();
        if (new Date() - view.date >= 60000) {
            setView({...view, date: new Date()});
            getData();
            getDataAnnouncement();
            getDataAd();
        }

        if (new Date() - announcementText.date >= 60000) {
            announcementSwitcher();
        }
        if (new Date() - adImage.date >= 60000) {
            adSwitcher();
        }

    }, [clockLauncher, announcementSwitcher, adSwitcher, getDataAnnouncement, getData, getDataAd]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);




    return (
        <div>
            <div className="head">
                <div id="time" className="container" style={{display: "inline-block"}}>
                    <h5>
                        <p>{clock.clock}<br/>
                            {clock.clockDate}<br/>
                            {clock.clockDay}
                        </p>
                    </h5>
                    <p className="red-text">
                        {view.editDate}
                    </p>
                </div>
                <div id="caption">
                    <h5>РАСПИСАНИЕ ЗАНЯТИЙ</h5>
                </div>
                {flagDirImage &&
                <div id="director">
                    <img id="dirImage" src={dir.urlImage} width="100" height="100" align="left"/>
                    <p id="directorText">
                        <b>{dir.name}</b><br/>
                        <b>{dir.text}</b><br/>
                    </p>
                </div>
                }
            </div>
            <div className="schedule" id="table1">
                <div className="separation" id="hideCell"></div>
                <div className="separation">{view.classrooms[0].name}</div>
                <div className="separation">{view.classrooms[1].name}</div>
                <div className="separation">{view.classrooms[2].name}</div>
                <div className="separation">{view.classrooms[3].name}</div>
                <div className="separation">{view.classrooms[4].name}</div>
                <div className="separation">{view.classrooms[5].name}</div>
                <div className="separation">{view.classrooms[6].name}</div>
                <div className="separation">{view.classrooms[7].name}</div>
                <div className="separation">{view.classrooms[8].name}</div>
                <div className="separation">{view.classrooms[9].name}</div>

                <div className="separation">{view.times[0]}</div>
                <div>{view.classrooms[0].subjects[0].name}</div>
                <div>{view.classrooms[1].subjects[0].name}</div>
                <div>{view.classrooms[2].subjects[0].name}</div>
                <div>{view.classrooms[3].subjects[0].name}</div>
                <div>{view.classrooms[4].subjects[0].name}</div>
                <div>{view.classrooms[5].subjects[0].name}</div>
                <div>{view.classrooms[6].subjects[0].name}</div>
                <div>{view.classrooms[7].subjects[0].name}</div>
                <div>{view.classrooms[8].subjects[0].name}</div>
                <div>{view.classrooms[9].subjects[0].name}</div>

                <div className="separation">{view.times[1]}</div>
                <div>{view.classrooms[0].subjects[1].name}</div>
                <div>{view.classrooms[1].subjects[1].name}</div>
                <div>{view.classrooms[2].subjects[1].name}</div>
                <div>{view.classrooms[3].subjects[1].name}</div>
                <div>{view.classrooms[4].subjects[1].name}</div>
                <div>{view.classrooms[5].subjects[1].name}</div>
                <div>{view.classrooms[6].subjects[1].name}</div>
                <div>{view.classrooms[7].subjects[1].name}</div>
                <div>{view.classrooms[8].subjects[1].name}</div>
                <div>{view.classrooms[9].subjects[1].name}</div>

                <div className="separation">{view.times[2]}</div>
                <div>{view.classrooms[0].subjects[2].name}</div>
                <div>{view.classrooms[1].subjects[2].name}</div>
                <div>{view.classrooms[2].subjects[2].name}</div>
                <div>{view.classrooms[3].subjects[2].name}</div>
                <div>{view.classrooms[4].subjects[2].name}</div>
                <div>{view.classrooms[5].subjects[2].name}</div>
                <div>{view.classrooms[6].subjects[2].name}</div>
                <div>{view.classrooms[7].subjects[2].name}</div>
                <div>{view.classrooms[8].subjects[2].name}</div>
                <div>{view.classrooms[9].subjects[2].name}</div>

                <div className="separation">{view.times[3]}</div>
                <div>{view.classrooms[0].subjects[3].name}</div>
                <div>{view.classrooms[1].subjects[3].name}</div>
                <div>{view.classrooms[2].subjects[3].name}</div>
                <div>{view.classrooms[3].subjects[3].name}</div>
                <div>{view.classrooms[4].subjects[3].name}</div>
                <div>{view.classrooms[5].subjects[3].name}</div>
                <div>{view.classrooms[6].subjects[3].name}</div>
                <div>{view.classrooms[7].subjects[3].name}</div>
                <div>{view.classrooms[8].subjects[3].name}</div>
                <div>{view.classrooms[9].subjects[3].name}</div>

                <div className="separation">{view.times[4]}</div>
                <div>{view.classrooms[0].subjects[4].name}</div>
                <div>{view.classrooms[1].subjects[4].name}</div>
                <div>{view.classrooms[2].subjects[4].name}</div>
                <div>{view.classrooms[3].subjects[4].name}</div>
                <div>{view.classrooms[4].subjects[4].name}</div>
                <div>{view.classrooms[5].subjects[4].name}</div>
                <div>{view.classrooms[6].subjects[4].name}</div>
                <div>{view.classrooms[7].subjects[4].name}</div>
                <div>{view.classrooms[8].subjects[4].name}</div>
                <div>{view.classrooms[9].subjects[4].name}</div>

                <div className="separation">{view.times[5]}</div>
                <div>{view.classrooms[0].subjects[5].name}</div>
                <div>{view.classrooms[1].subjects[5].name}</div>
                <div>{view.classrooms[2].subjects[5].name}</div>
                <div>{view.classrooms[3].subjects[5].name}</div>
                <div>{view.classrooms[4].subjects[5].name}</div>
                <div>{view.classrooms[5].subjects[5].name}</div>
                <div>{view.classrooms[6].subjects[5].name}</div>
                <div>{view.classrooms[7].subjects[5].name}</div>
                <div>{view.classrooms[8].subjects[5].name}</div>
                <div>{view.classrooms[9].subjects[5].name}</div>

            </div>
            <div className="schedule" id="table2">
                <div className="separation" id="hideCell"></div>
                <div className="separation">{view.classrooms[10].name}</div>
                <div className="separation">{view.classrooms[11].name}</div>
                <div className="separation">{view.classrooms[12].name}</div>
                <div className="separation">{view.classrooms[13].name}</div>
                <div className="separation">{view.classrooms[14].name}</div>
                <div className="separation">{view.classrooms[15].name}</div>
                <div className="separation">{view.classrooms[16].name}</div>
                <div className="separation">{view.classrooms[17].name}</div>
                <div className="separation">{view.classrooms[18].name}</div>
                <div className="separation">{view.classrooms[19].name}</div>

                <div className="separation">{view.times[0]}</div>
                <div>{view.classrooms[10].subjects[0].name}</div>
                <div>{view.classrooms[11].subjects[0].name}</div>
                <div>{view.classrooms[12].subjects[0].name}</div>
                <div>{view.classrooms[13].subjects[0].name}</div>
                <div>{view.classrooms[14].subjects[0].name}</div>
                <div>{view.classrooms[15].subjects[0].name}</div>
                <div>{view.classrooms[16].subjects[0].name}</div>
                <div>{view.classrooms[17].subjects[0].name}</div>
                <div>{view.classrooms[18].subjects[0].name}</div>
                <div>{view.classrooms[19].subjects[0].name}</div>

                <div className="separation">{view.times[1]}</div>
                <div>{view.classrooms[10].subjects[1].name}</div>
                <div>{view.classrooms[11].subjects[1].name}</div>
                <div>{view.classrooms[12].subjects[1].name}</div>
                <div>{view.classrooms[13].subjects[1].name}</div>
                <div>{view.classrooms[14].subjects[1].name}</div>
                <div>{view.classrooms[15].subjects[1].name}</div>
                <div>{view.classrooms[16].subjects[1].name}</div>
                <div>{view.classrooms[17].subjects[1].name}</div>
                <div>{view.classrooms[18].subjects[1].name}</div>
                <div>{view.classrooms[19].subjects[1].name}</div>

                <div className="separation">{view.times[2]}</div>
                <div>{view.classrooms[10].subjects[2].name}</div>
                <div>{view.classrooms[11].subjects[2].name}</div>
                <div>{view.classrooms[12].subjects[2].name}</div>
                <div>{view.classrooms[13].subjects[2].name}</div>
                <div>{view.classrooms[14].subjects[2].name}</div>
                <div>{view.classrooms[15].subjects[2].name}</div>
                <div>{view.classrooms[16].subjects[2].name}</div>
                <div>{view.classrooms[17].subjects[2].name}</div>
                <div>{view.classrooms[18].subjects[2].name}</div>
                <div>{view.classrooms[19].subjects[2].name}</div>

                <div className="separation">{view.times[3]}</div>
                <div>{view.classrooms[10].subjects[3].name}</div>
                <div>{view.classrooms[11].subjects[3].name}</div>
                <div>{view.classrooms[12].subjects[3].name}</div>
                <div>{view.classrooms[13].subjects[3].name}</div>
                <div>{view.classrooms[14].subjects[3].name}</div>
                <div>{view.classrooms[15].subjects[3].name}</div>
                <div>{view.classrooms[16].subjects[3].name}</div>
                <div>{view.classrooms[17].subjects[3].name}</div>
                <div>{view.classrooms[18].subjects[3].name}</div>
                <div>{view.classrooms[19].subjects[3].name}</div>

                <div className="separation">{view.times[4]}</div>
                <div>{view.classrooms[10].subjects[4].name}</div>
                <div>{view.classrooms[11].subjects[4].name}</div>
                <div>{view.classrooms[12].subjects[4].name}</div>
                <div>{view.classrooms[13].subjects[4].name}</div>
                <div>{view.classrooms[14].subjects[4].name}</div>
                <div>{view.classrooms[15].subjects[4].name}</div>
                <div>{view.classrooms[16].subjects[4].name}</div>
                <div>{view.classrooms[17].subjects[4].name}</div>
                <div>{view.classrooms[18].subjects[4].name}</div>
                <div>{view.classrooms[19].subjects[4].name}</div>

                <div className="separation">{view.times[5]}</div>
                <div>{view.classrooms[10].subjects[5].name}</div>
                <div>{view.classrooms[11].subjects[5].name}</div>
                <div>{view.classrooms[12].subjects[5].name}</div>
                <div>{view.classrooms[13].subjects[5].name}</div>
                <div>{view.classrooms[14].subjects[5].name}</div>
                <div>{view.classrooms[15].subjects[5].name}</div>
                <div>{view.classrooms[16].subjects[5].name}</div>
                <div>{view.classrooms[17].subjects[5].name}</div>
                <div>{view.classrooms[18].subjects[5].name}</div>
                <div>{view.classrooms[19].subjects[5].name}</div>
            </div>

            <div className="foot">
                <div id="ad1">
                    {flagAd && <img src={adImage.url} width="700" height="80" align="left"/>}
                </div>
                <div id="announcement">{announcementText.text}</div>
            </div>

        </div>
    )
};