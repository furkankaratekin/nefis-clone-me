// Firebase ve Redux ile ilişkili kütüphaneleri ve fonksiyonları import ediyoruz.
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"; // Firebase authentikasyon fonksiyonlarını import ediyoruz.
import { app } from "../firebase"; // Firebase app konfigürasyonunu import ediyoruz.
import { useDispatch } from "react-redux"; // Redux store'u güncellemek için useDispatch hook'unu import ediyoruz.
import { signInSuccess } from "../redux/user/userSlice"; // Kullanıcı girişi başarılı olduğunda kullanılacak action'ı import ediyoruz.
import { useNavigate } from "react-router-dom"; // Sayfa yönlendirmesi için useNavigate hook'unu import ediyoruz.

// OAuth fonksiyonel componentini tanımlıyoruz.
export default function OAuth() {
  const dispatch = useDispatch(); // Redux store'unu güncellemek için useDispatch hook'unu kullanıyoruz.
  const navigate = useNavigate(); // Sayfa yönlendirmeleri için useNavigate hook'unu kullanıyoruz.

  // Google ile giriş yap butonuna basıldığında çalışacak fonksiyon.
  const handleGoogleClick = async () => {
    try {
      // Google için yeni bir auth provider oluşturuyoruz.
      const provider = new GoogleAuthProvider();
      // Firebase app üzerinden auth nesnesini alıyoruz.
      const auth = getAuth(app);

      // Google ile giriş yapma işlemini başlatıyoruz.
      const result = await signInWithPopup(auth, provider);
      // Backend'e kullanıcı bilgilerini göndermek üzere bir POST isteği yapıyoruz.
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName, // Kullanıcının adını gönderiyoruz.
          email: result.user.email, // Kullanıcının email adresini gönderiyoruz.
          photo: result.user.photoURL, // Kullanıcının fotoğraf URL'sini gönderiyoruz.
        }),
      });
      const data = await res.json(); // Backend'den gelen yanıtı JSON formatına çeviriyoruz.
      console.log(data);
      dispatch(signInSuccess(data)); // Redux store'unu güncelliyoruz.
      navigate("/"); // Kullanıcıyı anasayfaya yönlendiriyoruz.
    } catch (error) {
      // Hata oluşursa konsolda görüntülüyoruz.
      console.log("could not login with google", error);
    }
  };

  // Google ile giriş yap butonunu render ediyoruz.
  return (
    <button
      type="button"
      onClick={handleGoogleClick} // Butona tıklandığında handleGoogleClick fonksiyonunu çalıştır.
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95" // Butonun stilini belirliyoruz.
    >
      Continue with google
    </button>
  );
}
