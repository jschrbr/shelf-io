function generateParts(data) {
	return data
		? data.documents.map((part) => {
			return {
				id: part.name.split("/").pop(),
				name: part.fields.name.stringValue,
				quantity: part.fields.quantity.integerValue,
			};
		})
		: [];
}

export { generateParts };
