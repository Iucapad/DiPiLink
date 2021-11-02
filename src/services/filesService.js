export class FilesService {
    constructor() {
        this.storageFolder = () => navigator.storage.getDirectory();
    };
    get folder() { return this.storageFolder }
  };
  
  export const filesService = new FilesService();