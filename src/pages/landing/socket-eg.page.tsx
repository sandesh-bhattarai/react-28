import { useEffect, useState } from "react"
import socket from "../../config/socket.config"

const SocketExample = () => {
    const [socketConnected, setSocketConnected] = useState(socket.connected)
    const [dataList, setDataList] = useState([] as any)
    
    const [value, setValue] = useState()

    const connectSocket = () => {
        socket.connect()
    }

    const disconnectSocket = () => {
        socket.disconnect()
    }

    useEffect(() => {
        const onConnect = () => {
            setSocketConnected(true)
        }

        const onDisconnect = () => {
            setSocketConnected(false)
        }

        const onNewMessage = (value: any) => {
            // TODO: cleanup
            const oldData = [...dataList, value]
            setDataList(oldData)

        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("message-received", onNewMessage)

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off('message-received', onNewMessage)
        }

    },[])

    const submitData = (e: any) => {
        e.preventDefault()
        socket.timeout(5000).emit("new-message", value)
    }

    return (<>
        <div className="m-20">
        {
            socketConnected ? <>
            <button 
            onClick={disconnectSocket}
            className="border-2 px-3 py-2 border-green-800 rounded bg-green-700 text-white hover:bg-green-500 hover:border-green-500">Dis-Connect</button>
            </> : <button 
            onClick={connectSocket}
            className="border-2 px-3 py-2 border-green-800 rounded bg-green-700 text-white hover:bg-green-500 hover:border-green-500">Connect</button>
        }

        <hr className="mt-3"/>
        <ol>
        {
            dataList && dataList.map((data: any,ind: number) => (
                <li key={ind}>
                    {data}
                </li>
            ))
        }
        </ol>
        <form onSubmit={submitData}>
            <input className="w-full border my-3 py-1 px-3 border-gray-400" placeholder="Enter Your Todo.." type="text" onChange={(e: any) => {
                setValue(e.target.value)
            }}/>
            <button className="border-2 px-3 py-2 border-green-800 rounded bg-green-700 text-white hover:bg-green-500 hover:border-green-500">
                Submit
            </button>
        </form>

        </div>
    </>)
}

export default SocketExample