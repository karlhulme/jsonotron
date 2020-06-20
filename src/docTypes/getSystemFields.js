/**
 * These are the fields that must be on any document that is passed
 * to the document store.  Most of these properties will be saved as is.
 * However, upon saving, the document store should either
 * (i) Generate a new docVersion
 * (ii) Remove the docVersion from the document on the grounds that the
 * underlying database will assign something (e.g. an eTag) instead.  In
 * this case, the document store should also allow that underlying
 * version to be queried as 'docVersion' and insert into any retrieved
 * documents.
 */
module.exports = () => [
  // id must be provided for the document to save.  The id must also
  // be provided by the doc store when returns a document
  'id',

  // docType must be provided for the document to save and query.
  // Similar to id, this field is mandatory.
  'docType',

  // docVersion is required when retrieving a document so the doc store
  // will need to produce one.  Otherwise it is largely ignored by the
  // save pipeline.  Intead, upon saving, the store should either:
  // (i) Generate a new docVersion
  // (ii) Remove the docVersion from the document on the grounds that the
  // underlying database will assign something (e.g. an eTag) instead.  In
  // this case, the document store should also allow that underlying
  // version to be queried as 'docVersion' and insert into any retrieved
  // documents.
  'docVersion',

  // sys is not required on the query pipeline because Jsonotron will
  // re-create any parts as best it can.  it must be present in order
  // to save the document.
  'sys'
]
