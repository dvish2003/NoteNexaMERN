import mongoose,{Schema} from 'mongoose'

export type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    userId: mongoose.Types.ObjectId;
    userName:string;
}

const noteSchema = new mongoose.Schema<Note>({
    id: {
        type: String
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: [true, "User ID is required"]
    },
    userName:{
        type:String,
        required:[true,"User Name is required"]
    }
})

export const NoteModel = mongoose.model('Note', noteSchema);

