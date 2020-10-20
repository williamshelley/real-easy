const { receive, clear } = require("./generic_actions");
export const PUSH_MODAL = "PUSH_MODAL";
export const POP_MODAL = "PUSH_MODAL";

const MODAL = "modal";

export const pushModal = (name, props) => receive(PUSH_MODAL, MODAL, { name, props });
export const popModal = () => clear(POP_MODAL);

