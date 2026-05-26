---
name: Object storage setup
description: Object storage (GCS) is provisioned and configured for portfolio image uploads
---

Replit Object Storage is provisioned for this project.

## Bucket
- ID: stored in `DEFAULT_OBJECT_STORAGE_BUCKET_ID` secret
- Sidecar auth endpoint: `http://127.0.0.1:1106`

## Files copied from skill template
- `artifacts/api-server/src/lib/objectStorage.ts` — ObjectStorageService + objectStorageClient
- `artifacts/api-server/src/lib/objectAcl.ts` — ACL framework
- `artifacts/api-server/src/routes/storage.ts` — public/private object serving routes

## Upload approach
Used multer (memory storage) + `objectStorageClient.bucket(id).file(path).save(buffer)` + `makePublic()` in portfolio.ts rather than presigned URLs. Reason: presigned URL generation requires service account credentials, not Replit sidecar auth.

## Packages installed
- `@google-cloud/storage` (in api-server)
- `google-auth-library` (in api-server)
- `multer` + `@types/multer` (in api-server)

**Why:** Direct upload via Express + multer is simpler for admin-only uploads and avoids CORS complexity of presigned URLs.
