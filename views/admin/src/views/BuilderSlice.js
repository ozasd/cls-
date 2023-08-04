import { createSlice } from '@reduxjs/toolkit'


export const BuilderSlice = createSlice({
    name: "Builder",
    initialState: {

        leave: {
            id: [],
            name: [],
            type_id: []
        },
        Makeup: {
            studentid: [],
            studentname: [],
            type_id: [],
            teacherid: [],
            teacherName: [],
            time: [],
            date: []
        }
    },
    reducers: {
        add_leave: (state, actions) => {
            var Exist = false
            Array.from(state.leave.name).forEach((item, i) => {
                if (item === actions.payload.name && state.leave.type_id[i] === actions.payload.type_id) {
                    Exist = true
                }
            })
            if (!Exist) {
                state.leave.id.push(actions.payload.id)
                state.leave.name.push(actions.payload.name)
                state.leave.type_id.push(actions.payload.type_id)
            } else {
                var text = actions.payload.name + "已請假 !"
                alert(text)
            }
        },
        remove_leave: (state, actions) => {
            Array.from(state.leave.name).forEach((item, i) => {
                if (item === actions.payload.name && state.leave.type_id[i] === actions.payload.type_id) {
                    state.leave.id.splice(i, 1)
                    state.leave.name.splice(i, 1)
                    state.leave.type_id.splice(i, 1)
                }
            })

        },
        add_Makeup: (state, actions) => {
            state.Makeup.date.push(actions.payload.date)
            state.Makeup.time.push(actions.payload.time)
            state.Makeup.type_id.push(actions.payload.type_id)
            state.Makeup.studentid.push(actions.payload.studentid)
            state.Makeup.studentname.push(actions.payload.studentname)
            state.Makeup.teacherid.push(actions.payload.teacherid)
            state.Makeup.teacherName.push(actions.payload.teacherName)
        },
        remove_Makeup:(state,actions) => {
            console.log(actions.payload)
            // {studentname: 'kiki', type_id: '1', time: '13:00~14:30', date: '2023-07-25'}
            Array.from(state.Makeup.studentname).forEach((item, i) => {
                if (item === actions.payload.studentname && state.Makeup.type_id[i] === actions.payload.type_id && state.Makeup.time[i] === actions.payload.time&& state.Makeup.date[i] === actions.payload.date)  {
                    state.Makeup.date.splice(i, 1)
                    state.Makeup.time.splice(i, 1)
                    state.Makeup.type_id.splice(i, 1)
                    state.Makeup.studentid.splice(i, 1)
                    state.Makeup.studentname.splice(i, 1)
                    state.Makeup.teacherid.splice(i, 1)
                    state.Makeup.teacherName.splice(i, 1)
                }
            })
        }


    }
})


export const { add_leave, remove_leave, add_Makeup ,remove_Makeup} = BuilderSlice.actions
export default BuilderSlice.reducer