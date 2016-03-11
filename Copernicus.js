{
	"translatorID": "8082115d-5bc6-4517-a4e8-abed1b2a784a",
	"label": "Copernicus",
	"creator": "Michael Berkowitz",
	"target": "^https?://(www\\.(?:adv-sci-res|earth-syst-dynam|adv-geosci|adv-radio-sci|ann-geophys|astrophys-space-sci-trans|atmos-chem-phys|atmos-meas-tech|biogeosciences|clim-past|electronic-earth|hydrol-earth-syst-sci|nat-hazards-earth-syst-sci|nonlin-processes-geophys|ocean-sci|soc-geogr|surv-perspect-integr-environ-soc|the-cryosphere|geosci-model-dev)(?:-discuss)?\\.net/|editor\\.copernicus\\.org/search\\.php)",
	"minVersion": "2.1",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2016-03-11 04:16:27"
}

/*
    ***** BEGIN LICENSE BLOCK *****

    Copyright © 2016 Sebastian Karcher

    This file is part of Zotero.

    Zotero is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Zotero is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with Zotero. If not, see <http://www.gnu.org/licenses/>.

    ***** END LICENSE BLOCK *****
*/

function detectWeb(doc, url) {
	if (url.search(/\/search\.php|\.net\/$|issue\d+\.html/)!=-1 && getSearchResults(doc, true)) {
		return "multiple";
	} else if (doc.title.search(/Abstract|Peer review|Metrics|Relations/) != -1) {
		return "journalArticle";
	}
}

function getSearchResults(doc, checkOnly) {
    var items = {};
    var found = false;
    var rows = doc.getElementsByClassName("article-title");
    for (var i=0; i<rows.length; i++) {
        var href = rows[i].href;
        var title = ZU.trimInternal(rows[i].textContent);
        if (!href || !title) continue;
        if (checkOnly) return true;
        found = true;
        items[href] = title;
    }
    return found ? items : false;
}

function scrape (doc, url){
	var abstract = ZU.xpathText(doc, '//span[@class="pb_abstract"]');
	var link = ZU.xpathText(doc, '//ul[@class="additional_info"]/li/a[contains(text(), "EndNote")]/@href');
	Zotero.Utilities.HTTP.doGet(link, function(text) {
		//Z.debug(text)
		var translator = Zotero.loadTranslator("import");
		translator.setTranslator("32d59d2d-b65a-4da4-b0a3-bdd3cfb979e7");
		translator.setString(text);
		translator.setHandler("itemDone", function(obj, item) {
			item.repository = "Copernicus Online Journals";
			if (!item.abstractNote && abstract){
				item.abstractNote = abstract.replace(/\n(?!\n)\s*/g, " ").replace(/^Abstract\.\s*/, ""); //preserve paragraphs but not line breaks all over
			}
			if(item.attachments[0]) {
				item.attachments[0].title = item.publicationTitle + " PDF";
				item.attachments[0].mimeType = "application/pdf";
			}
			item.complete();
		});
		translator.translate();
	});
}

function doWeb(doc, url) {
	var arts = new Array();
	if (detectWeb(doc, url) == "multiple") {
		var items = getSearchResults(doc);
		Zotero.selectItems(items, function (items) {
			if (!items) {
				return true;
			}
			for (var i in items) {
				arts.push(i);
			}
			ZU.processDocuments(arts, scrape);
		});
	} else {
		scrape(doc, url)
	}
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "http://www.adv-geosci.net/30/1/2011/adgeo-30-1-2011.html",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Preface ''Precipitation: Measurement, Climatology, Remote Sensing, and Modeling (EGU 2010)''",
				"creators": [
					{
						"lastName": "Michaelides",
						"firstName": "S.",
						"creatorType": "author"
					},
					{
						"lastName": "Athanasatos",
						"firstName": "S.",
						"creatorType": "author"
					}
				],
				"date": "May 9, 2011",
				"DOI": "10.5194/adgeo-30-1-2011",
				"ISSN": "1680-7359",
				"abstractNote": "No abstract available.",
				"journalAbbreviation": "Adv. Geosci.",
				"libraryCatalog": "Copernicus Online Journals",
				"pages": "1-2",
				"publicationTitle": "Adv. Geosci.",
				"shortTitle": "Preface ''Precipitation",
				"url": "http://www.adv-geosci.net/30/1/2011/",
				"volume": "30",
				"attachments": [
					{
						"title": "Adv. Geosci. PDF",
						"mimeType": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.adv-radio-sci.net/6/1/2008/ars-6-1-2008.html",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Time domain reflectrometry measurements using a movable obstacle for the determination of dielectric profiles",
				"creators": [
					{
						"lastName": "Will",
						"firstName": "B.",
						"creatorType": "author"
					},
					{
						"lastName": "Gerding",
						"firstName": "M.",
						"creatorType": "author"
					},
					{
						"lastName": "Schultz",
						"firstName": "S.",
						"creatorType": "author"
					},
					{
						"lastName": "Schiek",
						"firstName": "B.",
						"creatorType": "author"
					}
				],
				"date": "May 26, 2008",
				"DOI": "10.5194/ars-6-1-2008",
				"ISSN": "1684-9973",
				"abstractNote": "Microwave techniques for the measurement of the permittivity of soils including the water content of soils and other materials, especially TDR (time domain reflectometry), have become accepted as routine measurement techniques. This summary deals with an advanced use of the TDR principle for the determination of the water content of soil along a probe. The basis of the advanced TDR technique is a waveguide, which is inserted into the soil for obtaining measurements of the effective soil permittivity, from which the water content is estimated, and an obstacle, which can mechanically be moved along the probe and which acts as a reference reflection for the TDR system with an exactly known position. Based on the known mechanical position of the reference reflection, the measured electrical position can be used as a measure for the effective dielectric constant of the environment. Thus, it is possible to determine the effective dielectric constant with a spatial resolution given by the step size of the obstacle displacement.  A conventional industrial TDR-system, operating in the baseband, is used for the signal generation and for the evaluation of the pulse delay time of the obstacle reflection. Thus, a cost effective method for the acquisition of the dielectric measurement data is available.",
				"journalAbbreviation": "Adv. Radio Sci.",
				"libraryCatalog": "Copernicus Online Journals",
				"pages": "1-4",
				"publicationTitle": "Adv. Radio Sci.",
				"url": "http://www.adv-radio-sci.net/6/1/2008/",
				"volume": "6",
				"attachments": [
					{
						"title": "Adv. Radio Sci. PDF",
						"mimeType": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.atmos-chem-phys.net/14/4349/2014/acp-14-4349-2014-metrics.html",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "TransCom N2O model inter-comparison – Part 1: Assessing the influence of transport and surface fluxes on tropospheric N2O variability",
				"creators": [
					{
						"lastName": "Thompson",
						"firstName": "R. L.",
						"creatorType": "author"
					},
					{
						"lastName": "Patra",
						"firstName": "P. K.",
						"creatorType": "author"
					},
					{
						"lastName": "Ishijima",
						"firstName": "K.",
						"creatorType": "author"
					},
					{
						"lastName": "Saikawa",
						"firstName": "E.",
						"creatorType": "author"
					},
					{
						"lastName": "Corazza",
						"firstName": "M.",
						"creatorType": "author"
					},
					{
						"lastName": "Karstens",
						"firstName": "U.",
						"creatorType": "author"
					},
					{
						"lastName": "Wilson",
						"firstName": "C.",
						"creatorType": "author"
					},
					{
						"lastName": "Bergamaschi",
						"firstName": "P.",
						"creatorType": "author"
					},
					{
						"lastName": "Dlugokencky",
						"firstName": "E.",
						"creatorType": "author"
					},
					{
						"lastName": "Sweeney",
						"firstName": "C.",
						"creatorType": "author"
					},
					{
						"lastName": "Prinn",
						"firstName": "R. G.",
						"creatorType": "author"
					},
					{
						"lastName": "Weiss",
						"firstName": "R. F.",
						"creatorType": "author"
					},
					{
						"lastName": "O'Doherty",
						"firstName": "S.",
						"creatorType": "author"
					},
					{
						"lastName": "Fraser",
						"firstName": "P. J.",
						"creatorType": "author"
					},
					{
						"lastName": "Steele",
						"firstName": "L. P.",
						"creatorType": "author"
					},
					{
						"lastName": "Krummel",
						"firstName": "P. B.",
						"creatorType": "author"
					},
					{
						"lastName": "Saunois",
						"firstName": "M.",
						"creatorType": "author"
					},
					{
						"lastName": "Chipperfield",
						"firstName": "M.",
						"creatorType": "author"
					},
					{
						"lastName": "Bousquet",
						"firstName": "P.",
						"creatorType": "author"
					}
				],
				"date": "April 30, 2014",
				"DOI": "10.5194/acp-14-4349-2014",
				"ISSN": "1680-7324",
				"issue": "8",
				"journalAbbreviation": "Atmos. Chem. Phys.",
				"libraryCatalog": "Copernicus Online Journals",
				"pages": "4349-4368",
				"publicationTitle": "Atmos. Chem. Phys.",
				"shortTitle": "TransCom N2O model inter-comparison – Part 1",
				"url": "http://www.atmos-chem-phys.net/14/4349/2014/",
				"volume": "14",
				"attachments": [
					{
						"title": "Atmos. Chem. Phys. PDF",
						"mimeType": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.atmos-chem-phys.net/special_issue15.html",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "http://www.atmos-chem-phys.net/",
		"items": "multiple"
	}
]
/** END TEST CASES **/