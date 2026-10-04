import { redirect } from "next/navigation";
import { orter, ortPath } from "@/lib/orter";

/**
 * /flyttfirma har ingen egen översiktssida – den skickar vidare till den
 * första orten i listan (Helsingborg).
 *
 * `permanentRedirect` (308) används inte eftersom vilken ort som är först
 * kan komma att ändras. 307 gör att sökmotorer behåller /flyttfirma/[stad]
 * som de indexerbara adresserna utan att cementera målet.
 */
export default function FlyttfirmaSida() {
  redirect(ortPath(orter[0]));
}
