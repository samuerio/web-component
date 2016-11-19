define("test",[], function(){
		
	/**
	 * 保存数据
	 * @param {Object} pageId
	 * @param {Object} content
	 */
	function _saveData(pageId, content) {
		content = content || {};
		
		typeof(content) == String ? localStorage.setItem(pageId, content) : localStorage.setItem(pageId, JSON.stringify(content));
		
		return true;
	}
	
	/**
	 * 获取数据
	 * @param {Object} pageId
	 */
	function _getData(pageId) {
		var content = localStorage.getItem(pageId) || "{}";
		return JSON.parse(content);
	}
	
	return {
		
		/**
		 * 设置数据
		 * @param {Object} pageId
		 * @param {Object} content
		 */
		setData: function(pageId, content) {alert(1); return _saveData(pageId, content)},
		
		/**
		 * 获取数据
		 * @param {Object} pageId
		 */
		getData: function(pageId) { return _getData(pageId) }
		
	};
	

	

	
})
