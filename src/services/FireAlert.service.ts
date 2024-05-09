import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export default async function FireAlert(
  msg: string, icon: SweetAlertIcon = 'info',
  cancelable: boolean = false, title: string = 'System message'
):Promise<SweetAlertResult> {
  return Swal.fire({
    html: msg,
    icon,
    title,
    showDenyButton: cancelable,
  }).then(resp => resp);
}
