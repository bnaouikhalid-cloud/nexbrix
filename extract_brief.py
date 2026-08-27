import pypdf
reader = pypdf.PdfReader(r"C:\Users\Admin\Downloads\freelancer\Nexbrix\pdfs\NexBrix_Homepage_Design_Competition_Brief v2.pdf")
with open(r"C:\Users\Admin\Downloads\freelancer\Nexbrix\brief_text.txt", "w", encoding="utf-8") as f:
    for i, page in enumerate(reader.pages):
        f.write(f"--- Page {i+1} ---\n")
        f.write(page.extract_text() or "")
        f.write("\n\n")
print("Done extracting brief text")
