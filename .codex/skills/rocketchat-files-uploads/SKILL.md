---
name: rocketchat-files-uploads
description: Read and create uploads in Rocket.Chat Apps-Engine using upload readers/creators (IUploadRead, IUploadCreator) and implement file upload hooks (IPreFileUpload). Use when working with attachments, reading uploaded files, restricting uploads, or generating/uploading files from an app.
---

# Files And Uploads

## Read Uploads

- `read.getUploadReader()` -> `IUploadRead`
- Common ops: `getById(id)`, `getBuffer(upload)`

Types:

- `app/node_modules/@rocket.chat/apps-engine/definition/accessors/IUploadRead.d.ts`
- `app/node_modules/@rocket.chat/apps-engine/definition/uploads/*`

## Create Uploads

- `modify.getCreator().getUploadCreator()` -> `IUploadCreator`
- Common op: `uploadBuffer(buffer, descriptor)`

Types:

- `app/node_modules/@rocket.chat/apps-engine/definition/accessors/IUploadCreator.d.ts`
- `app/node_modules/@rocket.chat/apps-engine/definition/uploads/IUploadDescriptor.d.ts`

## Handle Upload Events (Policy/Validation)

- Implement `IPreFileUpload` to validate/restrict uploads.
- Types live in `app/node_modules/@rocket.chat/apps-engine/definition/uploads/IPreFileUpload.d.ts`

## Permissions

- Reading uploads typically requires `upload.read` in `app/app.json`.

## Fast Search

```powershell
rg -n "interface IUploadRead\\b|interface IUploadCreator\\b" app/node_modules/@rocket.chat/apps-engine/definition/accessors
rg -n "interface IPreFileUpload\\b" app/node_modules/@rocket.chat/apps-engine/definition/uploads
```

## Official Docs

- `.codex/skills/rocketchat-apps-engine-core/references/developer-docs.md`
