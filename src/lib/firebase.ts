// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { User } from "./models/user-model";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Biography, BiographyPayment } from "./models/biography-model";
import { error } from "console";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJdwB3F-UT7ckrhUEQ0hVgbeuCKXot6I4",
  authDomain: "in-memory-24f39.firebaseapp.com",
  projectId: "in-memory-24f39",
  storageBucket: "in-memory-24f39.appspot.com",
  messagingSenderId: "382841615930",
  appId: "1:382841615930:web:907ecee098a5392c58a703",
  measurementId: "G-637HELVTC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)


// user methods
// Función para obtener datos de usuario extendidos
export const getUser = async (userId: string) => {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return {
      ...userDoc.data()
    } as User;
  } else {
    return null
  }
};

export const createUser = async (user: User) => {
  try{
    const usersRef = collection(db, "users")
    await setDoc(doc(usersRef, user.uid), {
      ...user
    })
    return {
      success: "Usuario creado exitosamente"
    }
  }catch(err){
    return {
      error: "No se puedo crear el usuario"
    }
  }
};

export const updateUser = async (user: User) => {
  try{
    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      ...user
    })
    return {
      success: "Usuario actualizado correctamente"
    }
  }catch(err){
    return {
      error: "No se puedo actualizar el usuario"
    }
  }
};


interface ActionsUpload{
  onSuccessUpload: (url: string)=>void,
  onProgressUpload: (progress: number)=>void,
  onErrorUpload: (err: string)=>void
}

// storage 
export const uploadImage = async(subPaht: string, file: File, actionsUpload?: ActionsUpload)=>{
  const metadata = {
    contentType: file.type
  }

  const nameFile = `${subPaht}.${file.type.split("/")[1]}`
  const storageRef = ref(storage, "images/" +nameFile);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on("state_changed", 
    (snapshot)=>{
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      if(actionsUpload) actionsUpload.onProgressUpload(progress)

      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error)=>{
      if(actionsUpload) actionsUpload.onErrorUpload(error.message)
    },
    ()=>{
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        if(actionsUpload) actionsUpload.onSuccessUpload(downloadURL)
      });
    }
  )
}

export const uploadImageAsync = async (subPath: string, file: File, actionsUpload?: ActionsUpload): Promise<string> => {
  console.log("ImGE UPLOAD")
  const metadata = {
    contentType: file.type,
  };

  const nameFile = `${subPath}.${file.type.split("/")[1]}`
  const storageRef = ref(storage, "images/" +nameFile);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        if(actionsUpload) actionsUpload.onProgressUpload(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        if(actionsUpload) actionsUpload.onSuccessUpload(error.message);
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          if(actionsUpload) actionsUpload.onSuccessUpload(downloadURL);
          resolve(downloadURL);
        }).catch((error) => {
          reject(error);
        });
      }
    );
  });
};
export const uploadVideoAsync = async (subPath: string, file: File, actionsUpload?: ActionsUpload): Promise<string> => {
  const metadata = {
    contentType: file.type,
  };
  const nameFile = `${subPath}.${file.type.split("/")[1]}`
  const storageRef = ref(storage, "videos/" +nameFile);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        if(actionsUpload) actionsUpload.onProgressUpload(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        if(actionsUpload) actionsUpload.onSuccessUpload(error.message);
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          if(actionsUpload) actionsUpload.onSuccessUpload(downloadURL);
          resolve(downloadURL);
        }).catch((error) => {
          reject(error);
        });
      }
    );
  });
};

export const deleteFile = async (path: string):Promise<string> =>{
  const fileRef = ref(storage, path)

  return new Promise((resolve, reject) => {
    deleteObject(fileRef).then(() => {
      // File deleted successfully
      resolve("Eliminado correctamente")
    }).catch((error) => {
      // Uh-oh, an error occurred!
      reject(error)
    })
  })
}


// biographies storage
export const createBiography = async(biography: Biography)=>{
  try{
    const biographiesRef = collection(db, "biographies")
    const {id, ...newBiography} = biography
    await setDoc(doc(biographiesRef), {
      ...newBiography
    })
    return {
      success: "Biografía creada correctamente"
    }
  }catch(error){
    return {
      error: "No se puedo crear la Biografía"
    }
  }
}


export const getBiographiesByUser = async(userId: string)=>{
  try {
    const biographiesRef = collection(db, "biographies");
    const q = query(biographiesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const biographies = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      dateOfBirth: doc.data().dateOfBirth.toDate(),
      dateOfDeath: doc.data().dateOfDeath.toDate(),
      id: doc.id
    } as Biography ));

    return {biographies};
  } catch (error) {
    return {
      error: "No se pudieron obtener las Biografías",
    };
  }
}

export const getBiographiesByName = async(userId: string, nameBio: string)=>{
  try {
    const biographiesRef = collection(db, "biographies");
    const q = query(biographiesRef, where("userId", "==", userId), where("name", "==", nameBio.toLowerCase()));
    const querySnapshot = await getDocs(q);

    const biographies = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      dateOfBirth: doc.data().dateOfBirth.toDate(),
      dateOfDeath: doc.data().dateOfDeath.toDate(),
      id: doc.id
    } as Biography ));

    return {biographies};
  } catch (error) {
    return {
      error: "No se pudieron obtener las Biografías",
    };
  }
}

export const getBiographyById = async(bioId: string)=>{
  try {
    const biographyRef = doc(db, "biographies", bioId);
    const biography = await getDoc(biographyRef)
    if(biography.exists()){
      const bio = {
        ...biography.data(),
        dateOfBirth: biography.data().dateOfBirth.toDate(),
        dateOfDeath: biography.data().dateOfDeath.toDate(),
        id: biography.id
      } as Biography
      return {biography: bio}
    }
    return {
      error: "No existe la biografía"
    }
    
  } catch (error) {
    return {
      error: "No se pudo obtener la biografía",
    };
  }
}

export const updateBiography = async (bio: Biography) => {
  try{
    const bioRef = doc(db, "biographies", bio.id)
    const {id, ...updBio} = bio
    await updateDoc(bioRef, {
      ...updBio
    })
    return {
      success: "Biografia actualizada correctamente"
    }
  }catch(err){
    return {
      error: "No se puedo actualizar la biografía"
    }
  }
};
export const updateBiographyPayment = async (bioId: string, statusPayment: string) => {
  try{
    const bioRef = doc(db, "biographies", bioId)
    await updateDoc(bioRef, {
      statusPayment
    })
    return {
      success: "Biografia actualizada correctamente"
    }
  }catch(err){
    return {
      error: "No se puedo actualizar la biografía"
    }
  }
};

export const deleteBiography = async(bioId: string)=>{
  try{
    const bioRef = doc(db, "biographies", bioId)
    await deleteDoc(bioRef)

    return {
      success: "Biografía eliminada correctamente"
    }
  }catch(err){
    return {
      error: "No se pudo elimanar la biografía"
    }
  }
}


export const createPayment = async(bioPayment: BiographyPayment)=>{
  try{
    console.log("Bio Pay", bioPayment)
    const paymentsRef = collection(db, "payments")
    const {id, ...newBioPay} = bioPayment
    console.log(newBioPay)
    await setDoc(doc(paymentsRef), {
      ...newBioPay
    })

    return {
      success: "Pyament creado correctamente"
    }
  }catch(err){
    console.log(err)
    return {
      error: "No se pudo crear el payment"
    }
  }
}

export const getAllPayments = async()=>{
  try{
    const paymentsRef = collection(db, "payments")
    const paymentsSanapshot = await getDocs(paymentsRef)
    const paymentList = paymentsSanapshot.docs.map((doc)=>({
      ...doc.data(),
      id: doc.id,
      createAt: doc.data().createAt.toDate(),

    } as BiographyPayment))
    

    return {
      success: "Pyament obtenidos correctamente",
      payments: paymentList
    }
  }catch(err){
    return {
      error: "No se pudo obtener los payments"
    }
  }
}

export const getPaymentsByUser = async(userId: string)=>{
  try{
    const paymentsRef = collection(db, "payments")
    const q = query(paymentsRef, where("userId", "==", userId));
    const paymentsSanapshot = await getDocs(q)
    const paymentList = paymentsSanapshot.docs.map((doc)=>({
      ...doc.data(),
      id: doc.id,
      createAt: doc.data().createAt.toDate(),

    } as BiographyPayment))
    

    return {
      success: "Pyament obtenidos correctamente",
      payments: paymentList
    }
  }catch(err){
    return {
      error: "No se pudo obtener los payments"
    }
  }
}
export const getPaymentById = async(payId: string)=>{
  try{
    const paymentRef = doc(db, "payments", payId)
    const paymentDoc = await getDoc(paymentRef)

    if(paymentDoc.exists()){
      const payment = {
        ...paymentDoc.data(),
        id: paymentDoc.id,
        createAt: paymentDoc.data().createAt.toDate()
      } as BiographyPayment

      return {
        success: "Payment obtenido correctamente",
        payment: payment
      }
    }else{

      return {
        error: "El payment no existe",
      }
    }

  }catch(err){
    return {
      error: "No se pudo crear el payment"
    }
  }
}
export const updatePayment = async(payId: string, status: string, code: string)=>{
  try{
    const paymentRef = doc(db, "payments", payId)
    await updateDoc(paymentRef, {
      status: status,
      codigo: code
    })
    
      return {
        success: "Payment actualizado correctamente",
      }
    
  }catch(err){
    return {
      error: "No se pudo actualizar el payment"
    }
  }
}

export const listenerPayments = ()=>{
  // Escucha los eventos de nuevos elementos agregados a la colección 'donations'
  const paymentsRef = collection(db, "payments")
  
  onSnapshot(paymentsRef, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      const donation = change.doc.data();
      console.log('Nueva donación agregada:', donation);
    }
  });
});
}

