import { useController } from "react-hook-form"
import Select from 'react-select'

interface TextInputProps {
    type?: string, 
    control: any,
    name: string, 
    errMsg?: string | null,
    required?: boolean
}
export const TextInputField = ({control, type="text", name, errMsg = null}: TextInputProps) => {
    const {field} = useController({
        control: control,
        name: name
    })
    return (<>
        <input
            id={name}
            type={type}
            autoComplete={name}
            {...field}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500 px-2"
        />
        <span className="text-red-500">{errMsg}</span>

    
    </>)
}

export const SelectComopnent = ({errMsg=null, name, control, options=[]}: {errMsg?: string|null, options?: any[], name: string, control: any}) => {
    // options = [{label: "Seller", value:"seller"}, {label: "Buyer", value: "customer"}]
    const {field} = useController({
        control: control,
        name: name
    })
    return (<>
        <select
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            {...field}
        >
                <option value="">--select any one--</option>
                {
                    options && options.map((opt, ind) => (
                        <option key={ind} value={opt.value}>
                            {opt.label}
                        </option>
                    ))
                }
        </select>
        <span className="text-red-500">{errMsg}</span>
    </>)
}


export const SelectOptionComopnent = ({errMsg=null, name, control, options=[]}: {errMsg?: string|null, options?: any[], name: string, control: any}) => {
    // options = [{label: "Seller", value:"seller"}, {label: "Buyer", value: "customer"}]
    const {field} = useController({
        control: control,
        name: name
    })
    return (<>
       <Select options={options} {...field} isClearable={true}/>

        {/* <select
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            {...field}
        >
                <option value="">--select any one--</option>
                {
                    options && options.map((opt, ind) => (
                        <option key={ind} value={opt.value}>
                            {opt.label}
                        </option>
                    ))
                }
        </select> */}
        <span className="text-red-500">{errMsg}</span>
    </>)
}

