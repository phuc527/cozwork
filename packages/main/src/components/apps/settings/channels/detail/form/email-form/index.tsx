import { Button, FormGroup, Input, Label, Spinner } from "@doar/components";
import { hasKey } from "@doar/shared/methods";
import React, { FC, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { Channel } from "src/types/api/channel";
import { updateEmailChannelApi } from "../../../../../../../api/channel/emailChannel";

interface Props {
    channel: Channel;
}

interface FormValues {
    name: string;
    sender_name: string;
    signature: string;
}

const modules = {};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
];
const listTags = ["Agent first name", "Agent last name", "Agent email"];
const EmailForm: FC<Props> = ({ channel }) => {
    const [loading, setLoading] = useState(false);
    const editorRef = useRef<ReactQuill>(null);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: channel.name,
            sender_name: channel?.channelable?.sender_name || "",
            signature: channel.channelable?.signature || "",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            setLoading(true);
            await updateEmailChannelApi(channel.channelable_id, values);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const onClickTag = (tag: string) => {
        const selection = editorRef.current?.getEditor()?.getSelection(true);

        editorRef.current
            ?.getEditor()
            ?.insertText(selection?.index || 0, `[${tag}]`);
    };

    return (
        <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormGroup mb="20px">
                <Label display="block" mb="5px" htmlFor="name">
                    Name
                </Label>
                <Input
                    type="name"
                    id="name"
                    placeholder="yourname@yourmail.com"
                    feedbackText={errors?.name?.message}
                    state={hasKey(errors, "name") ? "error" : "success"}
                    showState={!!hasKey(errors, "name")}
                    {...register("name")}
                />
            </FormGroup>
            <FormGroup mb="20px">
                <Label display="block" mb="5px" htmlFor="sender_name">
                    Sender name
                </Label>
                <Input
                    type="name"
                    id="sender_name"
                    feedbackText={errors?.sender_name?.message}
                    state={hasKey(errors, "sender_name") ? "error" : "success"}
                    showState={!!hasKey(errors, "sender_name")}
                    {...register("sender_name")}
                />
            </FormGroup>
            <FormGroup mb="20px">
                <Label display="block" mb="5px" htmlFor="signature">
                    Sender signals
                </Label>
                <Controller
                    control={control}
                    name="signature"
                    render={({ field }) => (
                        <div>
                            <ReactQuill
                                {...field}
                                modules={modules}
                                formats={formats}
                                ref={editorRef}
                            />
                        </div>
                    )}
                />
            </FormGroup>
            <FormGroup mb="20px">
                {listTags.map((tag) => (
                    <Button
                        key={tag}
                        size="xs"
                        mr="5px"
                        disabled={loading}
                        color="light"
                        onClick={() => onClickTag(tag)}
                    >
                        {tag}
                    </Button>
                ))}
            </FormGroup>
            <Button type="submit" disabled={loading}>
                {loading ? <Spinner color="white" /> : "Submit"}
            </Button>
        </form>
    );
};

export default EmailForm;
