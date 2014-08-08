/* 
 * Product Information (PI) Event
 * library for sending product information to ccs hive
 * requires: adapter.js 
 * 
 * Sean Burke 8/7/14
 */

(function(){
	PI = function(input)
	{
		/* 
		 * initialize the PI Object
		 */

		this.input = input;
		this.product = {};

		if(input)
		{
			           this.product.SKey = input.SKey;
			           this.product.LCID = input.LCID;
			         this.product.Market = input.Market;
			            this.product.cpn = input.cpn;
			          this.product.SkuId = input.SkuId;
			        this.product.SEanUpc = input.SEanUpc;
			            this.product.upc = input.upc;
			          this.product.upc14 = input.upc14;
			           this.product.isbn = input.isbn;
			         this.produdct.MfgId = input.MfgId;
			         this.product.SMfgPn = input.SMfgPn;
			          this.product.MfgPn = input.MfgPn;
			      this.product.userAgent = input.userAgent;
			         this.product.ProdId = input.ProdId;
			       this.product.ProdName = input.ProdName;
			       this.product.ProdDesc = input.ProdDesc;
			      this.product.ProdModel = input.ProdModel;
			      this.product.ProdImage = input.ProdImage;
			   this.product.ProdCategory = input.ProdCategory;
			      this.product.ProdPrice = input.ProdPrice;
			  this.product.priceCurrency = input.priceCurrency;
			    this.product.priceSymbol = input.priceSymbol;
			this.product.priceValidUntil = input.priceValidUntil;
			   this.product.availability = input.availability;
			  this.product.itemCondition = input.itemCondition;
		}


		/* 
		 * Get competitors off of page by looking through scripts
		 */

		this.getCompetitors= function(){
			return $('script').text().match(/(flix|sellpoint|webcollage|ccs|answers)/g).filter(function(elem, pos, self) {
	    		return self.indexOf(elem) == pos;
	    	});
		};

		this.product.competitors = this.getCompetitors();

		/* 
		 * send the PI event using ccs_cc_log variable
		 */

		this.send = function(){
			var _pie = this;
			if(ccs_cc_logsvc)
			{
				ccs_cc_logsvc.prototype.sendPI = function () {
						this.sendEvent("PI", _pie.getParamString(), window.location.href);
				};
				ccs_cc_log.sendPI();
			}
			else
			{
				console.log("ccs_cc_log variable not found");
			}
		};

		/* 
		 * returns the parameters as a URL Query String
		 */

		this.getParamString= function(){		
			var output = '';
			for(var f in this.product)
			{
				output += (this.product[f]) ? "&" + f + "=" + encodeURIComponent(this.product[f]): '';
			}	
			return output.substring(1);
		};
	};
})();