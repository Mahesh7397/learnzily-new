import React, { useState, useRef } from 'react';
import { Upload, File, X, Check, AlertCircle, FileText, BookOpen } from 'lucide-react';
import { UseDataProvider } from '../../contexts/DataProvider';



const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [formData, setFormData] = useState({
    filename: '',
    filecode: '',
    sem_month_year: '',
    collegename: '',
    field: '',
    degree: '',
    type: 'notes'
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const {HandleUpload}=UseDataProvider()

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCurrentFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentFile(e.target.files[0]);
    }
  };


const formatMonthYear = (value) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    const date = new Date(year, month - 1); // JS months are 0-based
    return date.toLocaleString("default", { month: "long" }) + "-" + year;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name=="sem_month_year"){
      setFormData(prev => ({
      ...prev,
      [name]: formatMonthYear(value)
    }));
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const getRequiredFields = () => {
    if (formData.type === 'notes') {
      return ['filename', 'field', 'degree'];
    } else {
      return ['filename', 'filecode', 'sem_month_year', 'collegename', 'field', 'degree'];
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = getRequiredFields();

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        const fieldNames = {
      filename: 'Subject name',
          filecode: 'Subject code',
          sem_month_year: 'Semester/Month/Year',
          collegename: 'College name',
          field: 'Course name',
          degree: 'College degree',
          type: 'File type'
        };
        newErrors[field] = `${fieldNames[field]} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentFile) {
      alert('Please select a file to upload');
      return;
    }

    if (!validateForm()) {
      return;
    }

    const newUploadedFile = {
      file: currentFile,
      data: { ...formData }
    };

    const data={...formData}
    const fileformdata=new FormData()
    fileformdata.append('file',currentFile)
    console.log(fileformdata.get('file'))

    console.log(newUploadedFile)
    HandleUpload(data,fileformdata)
    setUploadedFiles(prev => [...prev, newUploadedFile]);

    // Reset form
    setCurrentFile(null);
    setFormData({
      filename: '',
      filecode: '',
      sem_month_year: '',
      collegename: '',
      field: '',
      degree: '',
      type: 'notes'
    });



    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeUploadedFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const requiredFields = getRequiredFields();

  return (
    <div className="min-h-screen bg-background py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">
            Academic File Upload
          </h1>
          <p className="text-muted-foreground text-lg">Upload your academic files with detailed metadata</p>
        </div>

        <div className="glass-card rounded-xl shadow-primary p-8 mb-8 animate-slide-up">
          {/* File Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-4">
              File Type *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="type"
                  value="notes"
                  checked={formData.type === 'notes'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border group-hover:border-primary transition-colors">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">Notes</span>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="type"
                  value="question_paper"
                  checked={formData.type === 'question_paper'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border group-hover:border-primary transition-colors">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">Question Paper</span>
                </div>
              </label>
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${dragActive
                ? 'border-primary bg-primary/5'
                : currentFile
                  ? 'border-success bg-success/5'
                  : 'border-border hover:border-primary hover:bg-muted/50'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="absolute inset-0 w-full h-full opacity-1 cursor-pointer z-2"
              onChange={handleFileSelect}
            />

              {currentFile ? (
                <div className="flex items-center justify-center space-x-3 animate-bounce-in">
                  <div className="p-2 bg-success/20 rounded-full">
                    <Check className="w-6 h-6 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">{currentFile.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(currentFile.size)}</p>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">Drop your file here</p>
                  <p className="text-muted-foreground">or click to browse files</p>
                </div>
              )}
           
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject Name - Always required */}
              <div className={requiredFields.includes('filename') ? '' : 'opacity-50'}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject Name *
                </label>
                <input
                  type="text"
                  name="filename"
                  value={formData.filename}
                  onChange={handleInputChange}
                  disabled={!requiredFields.includes('filename')}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground transition-colors ${errors.filename
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                    } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="Enter subject name"
                />
                {errors.filename && (
                  <p className="mt-1 text-sm text-destructive flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.filename}
                  </p>
                )}
              </div>

              {/* Subject Code - Only for question papers */}
              <div className={requiredFields.includes('filecode') ? '' : 'opacity-50'}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject Code {requiredFields.includes('filecode') ? '*' : ''}
                </label>
                <input
                  type="text"
                  name="filecode"
                  value={formData.filecode}
                  onChange={handleInputChange}
                  disabled={!requiredFields.includes('filecode')}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground transition-colors ${errors.filecode
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                    } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="Enter subject code"
                />
                {errors.filecode && (
                  <p className="mt-1 text-sm text-destructive flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.filecode}
                  </p>
                )}
              </div>

              {/* Semester/Month/Year - Only for question papers */}
              <div className={requiredFields.includes('sem_month_year') ? '' : 'opacity-50'}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Semester/Month/Year {requiredFields.includes('sem_month_year') ? '*' : ''}
                </label>
                <input
                  type="month"
                  name="sem_month_year"
                  value={formData.sem_month_year}
                  onChange={handleInputChange}
                  disabled={!requiredFields.includes('sem_month_year')}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground transition-colors ${errors.sem_month_year
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                    } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="e.g., Sem 1 - Jan 2024"
                />
                {errors.sem_month_year && (
                  <p className="mt-1 text-sm text-destructive flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.sem_month_year}
                  </p>
                )}
              </div>

              {/* College Name - Only for question papers */}
              <div className={requiredFields.includes('collegename') ? '' : 'opacity-50'}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  College Name {requiredFields.includes('collegename') ? '*' : ''}
                </label>
                <input
                  type="text"
                  name="collegename"
                  value={formData.collegename}
                  onChange={handleInputChange}
                  disabled={!requiredFields.includes('collegename')}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground transition-colors ${errors.collegename
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                    } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="Enter college name"
                />
                {errors.collegename && (
                  <p className="mt-1 text-sm text-destructive flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.collegename}
                  </p>
                )}
              </div>

              {/* Course Name - Always required */}
              <div className={requiredFields.includes('field') ? '' : 'opacity-50'}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  disabled={!requiredFields.includes('field')}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground transition-colors ${errors.field
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                    } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="Enter course name"
                />
                {errors.field && (
                  <p className="mt-1 text-sm text-destructive flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.field}
                  </p>
                )}
              </div>

              {/* College Degree - Always required */}
              <div className={requiredFields.includes('degree') ? '' : 'opacity-50'}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  College Degree *
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  disabled={!requiredFields.includes('degree')}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground transition-colors ${errors.degree
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                    } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="e.g., Bachelor's, Master's"
                />
                {errors.degree && (
                  <p className="mt-1 text-sm text-destructive flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.degree}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full gradient-primary text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-primary hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={!currentFile}
            >
              Upload {formData.type === 'notes' ? 'Notes' : 'Question Paper'}
            </button>
          </form>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="glass-card rounded-xl shadow-primary p-8 animate-slide-up">
            <h2 className="text-xl font-semibold text-foreground mb-6">Uploaded Files</h2>
            <div className="space-y-4">
              {uploadedFiles.map((uploadedFile, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      {uploadedFile.data.type === 'notes' ? (
                        <FileText className="w-5 h-5 text-primary" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-foreground">{uploadedFile.file.name}</h3>
                        <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                          {uploadedFile.data.type === 'notes' ? 'Notes' : 'Question Paper'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                        <div><span className="font-medium">Subject:</span> {uploadedFile.data.filename}</div>
                        {uploadedFile.data.filecode && (
                          <div><span className="font-medium">Code:</span> {uploadedFile.data.filecode}</div>
                        )}
                        {uploadedFile.data.sem_month_year && (
                          <div><span className="font-medium">Semester:</span> {uploadedFile.data.sem_month_year}</div>
                        )}
                        {uploadedFile.data.collegename && (
                          <div><span className="font-medium">College:</span> {uploadedFile.data.collegename}</div>
                        )}
                        <div><span className="font-medium">Course:</span> {uploadedFile.data.field}</div>
                        <div><span className="font-medium">Degree:</span> {uploadedFile.data.degree}</div>
                        <div><span className="font-medium">Size:</span> {formatFileSize(uploadedFile.file.size)}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeUploadedFile(index)}
                    className="ml-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;