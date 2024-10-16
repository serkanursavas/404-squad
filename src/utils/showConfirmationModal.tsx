import Swal from 'sweetalert2'

interface SwalOptions {
  title: string
  text: string
  icon: 'warning' | 'error' | 'success' | 'question'
  confirmButtonText: string
  cancelButtonText?: string
  confirmButtonColor?: string
  cancelButtonColor?: string
  customClass?: {
    popup?: string
    title?: string
    confirmButton?: string
    cancelButton?: string
    input?: string // Form inputları için özel sınıf
  }
}

interface SuccessOptions {
  title: string
  text: string
  icon: 'success' | 'info' | 'warning' | 'error'
}

export const showConfirmationModal = async (
  options: SwalOptions,
  onConfirm: () => void,
  successOptions?: SuccessOptions | null, // SuccessOptions opsiyonel ve null olabilir
  onCancel?: () => void
) => {
  const {
    title,
    text,
    icon,
    confirmButtonText,
    cancelButtonText = 'Cancel',
    confirmButtonColor = '#04764E',
    cancelButtonColor = '#D32F2F',
    customClass = {}
  } = options

  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
    customClass: {
      title: customClass.title || 'text-sm', // Varsayılan küçültülmüş başlık boyutu
      popup: customClass.popup || 'text-sm rounded-none', // Varsayılan popup stilleri
      confirmButton: customClass.confirmButton || 'rounded-none shadow-pixel', // Özel buton sınıfı
      cancelButton: customClass.cancelButton || 'rounded-none shadow-pixel', // İptal butonu için özel sınıf
      input: customClass.input || '' // Input için özel sınıf
    }
  })

  if (result.isConfirmed) {
    onConfirm()

    if (successOptions !== null && successOptions) {
      Swal.fire({
        title: successOptions.title,
        text: successOptions.text,
        icon: successOptions.icon || 'success'
      })
    }
    // SuccessOptions yoksa veya null olarak belirlenmişse, başka bir işlem yapma
  } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
    onCancel()
  }
}
