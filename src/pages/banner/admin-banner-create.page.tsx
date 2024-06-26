import { useForm } from "react-hook-form";
import { TextInputField, SelectOptionComopnent } from "../../components/common/form";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../config/axios.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const AdminBannerCreate = () => {
    let [loading, setLoading] = useState(false)

    const createDTO = Yup.object({
        title: Yup.string().min(3).required(), 
        link: Yup.string().url().required(), 
        status: Yup.object({
            label: Yup.string().matches(/^(Publish|Unpublish)$/),
            value: Yup.string().matches(/^(active|inactive)$/)
        }).required(),
        image: Yup.mixed().required()
    })
    const {control, handleSubmit,setValue, formState: {errors}} = useForm({
        resolver: yupResolver(createDTO)
    })

    const navigate = useNavigate()

    const submitEvent = async (data: any) => {
        try {
            setLoading(true)
            const mappedData = {
                ...data,
                status: data.status.value
            }
            // api call 
            await  axiosInstance.post('/banner', mappedData, {
                headers: {
                    Authorization: "Bearer "+localStorage.getItem('accessToken'),
                    "Content-Type": "multipart/form-data"
                }
            })
            toast.success("Banner created successfully.")
            navigate("/admin/banner")
        } catch(exception) {
            // 
            // exce
            console.log(exception);
            toast.error("Error creating Banner")
        } finally {
            setLoading(false)
        }
    }
    return (<>
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 gap-8 lg:gap-16">
                    <h1 className="text-4xl font-bold">Banner Create</h1>
                </div>

                <div className="rounded-lg border border-gray-200 mt-8">
                    <div className="overflow-x-auto rounded-t-lg">
                        <form onSubmit={handleSubmit(submitEvent)} className="grid grid-cols-6 gap-6" >
                            <div className="col-span-6 ">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title <span className="text-red-800">*</span>
                                </label>

                                <TextInputField
                                    control={control}
                                    name="title"
                                    errMsg={errors?.title?.message as string}
                                    required={true}
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="link" className="block text-sm font-medium text-gray-700"> Link </label>
                                <TextInputField
                                    control={control}
                                    name="link"
                                    type="url"
                                    errMsg={errors?.link?.message as string}
                                    required={true}
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700"> Status </label>

                                <SelectOptionComopnent 
                                    options={[{ label: "Publish", value: "active" }, { label: "Unpublish", value: "inactive" }]}
                                    name="status"
                                    control={control}
                                    errMsg={errors?.status?.message as string}
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700"> Image</label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                    id="file_input"
                                    type="file"
                                    onChange={(e: any) => {
                                        const uploaded = e.target.files['0']
                                        setValue('image', uploaded);

                                    }}
                                />
                                <span className="text-red-500">{errors?.image?.message}</span>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-green-700 bg-green-700 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-700 focus:outline-none focus:ring active:text-green-600"
                                    disabled={loading}
                                >
                                    Create Banner 
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default AdminBannerCreate;