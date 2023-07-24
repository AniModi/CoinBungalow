import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/DAO_metadata",
});
export const db_metadata = db.collection("DaoMetadata")

const proposal_db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/Proposal_metadata",
});
export const db_proposals = proposal_db.collection("ProposalMetadata");

const property_db =  new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});
export const db_properties = property_db.collection("PropertyNFTMetadata");