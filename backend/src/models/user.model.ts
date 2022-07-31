import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'

export interface User extends Document {
    name:string;
    email:String;
    password:string;
    passwordConfirm:String
    isActive: Boolean
    checkPassword: (candidatePassword: string,userPassword:string ) => Promise<boolean>;
    

}



const userSchema = new Schema<User>({

    name: {
        type: String,
        required: [true, 'Please provide a name!']
      },
      email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(_email:any) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_email);
            },
            message: "Please enter a valid email"
        },
      },
   
      
      password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
      },
      
      

      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            
            validator: function(this:User, el:String) {
              return el === this.password;
            },
            message: 'Passwords do not match!'
          },
        select: false
      },

      
      isActive: {
       type: Boolean,
      default: true,
      select: false
     }

 
},{ timestamps: true })


userSchema.pre('save', async function(next) {
    
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
  
    this.passwordConfirm = '';
    next();
  });
  
  userSchema.methods.checkPassword = async function(
    candidatePassword:string,
    userPassword:string
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  

  
  userSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
  
  
  userSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   
      delete ret._id 
     }
  });
  






export const UserModel = model<User>("User", userSchema);