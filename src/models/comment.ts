import {Schema,model, Model} from "mongoose";

import {comment} from "./types";

const commentSchema:Schema= new Schema({
    name: {
        type: String,
    },
    text: {
        type: String
    },

});

const comment:Model<comment> = model<comment>("comments",commentSchema);

export default comment;
