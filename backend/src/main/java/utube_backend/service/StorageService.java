package utube_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
import software.amazon.awssdk.services.s3.model.HeadBucketRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class StorageService {
    private final S3Client s3;

    @Value("${utube.storage.originals-bucket:utube-originals}")
    private String originalsBucket;

    @Value("${utube.storage.thumbnails-bucket:utube-thumbnails}")
    private String thumbnailsBucket;

    public StorageService(S3Client s3) {
        this.s3 = s3;
    }

    public String upload(MultipartFile file, String bucket, String key) throws IOException {
        ensureBucket(bucket);
        s3.putObject(
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(key)
                        .contentType(file.getContentType())
                        .build(),
                RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        return key;
    }

    public String uploadOriginal(MultipartFile file, Long videoId) throws IOException {
        String safeName = file.getOriginalFilename() == null ? "video.mp4"
                : file.getOriginalFilename().replaceAll("[^a-zA-Z0-9._-]", "_");
        return upload(file, originalsBucket,
                "originals/" + videoId + "/" + safeName);
    }

    public String uploadThumbnail(MultipartFile file, Long videoId) throws IOException {
        return upload(file, thumbnailsBucket,
                "thumbnails/" + videoId + "/thumbnail.jpg");
    }

    private void ensureBucket(String bucket) {
        try {
            s3.headBucket(HeadBucketRequest.builder().bucket(bucket).build());
        } catch (Exception e) {
            try {
                s3.createBucket(CreateBucketRequest.builder().bucket(bucket).build());
            } catch (Exception ignored) {}
        }
    }
}
