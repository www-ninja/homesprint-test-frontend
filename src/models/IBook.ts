interface IPdf {
    isAvailable: boolean;
}

interface IEpub {
    isAvailable: boolean;
}

interface IImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

interface IReadingModes {
    text: boolean;
    image: boolean;
}

interface IIndustryIdentifiers {
    type: string;
    identifier: string;
};

interface IVolumnInfo {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate: string;
    description?: string;
    industryIdentifiers?: IIndustryIdentifiers[];
    readingModes?: IReadingModes;
    pageCount?: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    imageLinks: IImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
    panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
    }
};

interface ISaleInfo {
    country: string;
    isEbook: boolean;
    saleability: string;
}

interface IAccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: IEpub;
    pdf: IPdf;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}

interface ISearchInfo {
    textSnippet: string;
}

export interface IBook {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: IVolumnInfo;
    saleInfo: ISaleInfo;
    accessInfo: IAccessInfo;
    searchInfo: ISearchInfo;
}
